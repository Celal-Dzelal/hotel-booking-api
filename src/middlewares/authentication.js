"use strict";

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization;
  const tokenArr = auth ? auth.split(" ") : null;

  if (tokenArr && tokenArr[0] === "Bearer") {
    try {
      jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (error, accessData) => {
        req.user = accessData ? accessData : null;
      });
    } catch (error) {
      req.user = null;
    }
  }
  next();
};
