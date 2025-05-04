"use strict";

const CustomError = require("../helpers/customError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Login'
        #swagger.description = 'Login with username (or email) and password for get JWT'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username":"tester",
                "password":"123456aA&",
            }
        }
    */
    /*//! ------------------------------- UserControl ------------------------------ */

    const { username, password, email } = req.body;

    if (!((username || email) && password))
      throw new CustomError("Username/email and password are required", 404);

    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    });

    if (!user)
      throw new CustomError("Incorrect email/username or password", 401);

    if (!user.isActive) throw new CustomError("This account is not active");

    /*//! -------------------------------- JWT Token ------------------------------- */

    //? Access Token

    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    });

    //? Refresh Token

    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    /*//! -------------------------------------------------------------------------- */

    res.status(200).send({
      error: false,
      bearer: { access: accessToken, refresh: refreshToken },
      user: user,
      message: "Login Success",
    });
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Logout"
    */
    const auth = req.headers?.authorization;
    const tokenArr = auth ? auth.split(" ") : null;

    if (!(tokenArr && tokenArr[0] === "Bearer" && tokenArr[1]))
      throw new CustomError(
        "Invalid or missing Authorization header. Expected Bearer token"
      );

    res.status(200).send({
      error: false,
      message: "Logout Success",
    });
  },
  refresh: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Refresh"
    */
    const { refresh } = req.body;
    if (!refresh) throw new CustomError("Refresh token not found", 401);

    const refreshData = jwt.verify(refresh, process.env.REFRESH_KEY);
    if (!refreshData) throw new CustomError("JWT Refresh Token is wrong");

    const user = await User.findById(refreshData._id);
    if (!user) throw new CustomError("JWT Refresh Token data is broken");
    if (!user.isActive) throw new CustomError("This account is not active");

    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    });

    res.status(200).send({
      error: false,
      access: accessToken,
    });
  },
};
