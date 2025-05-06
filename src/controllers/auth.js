"use strict";

const CustomError = require("../helpers/customError"); //* Özel hata sınıfını içeri aktardık. Hataları daha anlamlı şekilde fırlatmamıza olanak tanır.
const User = require("../models/user"); //* Kullanıcı modeli, veritabanı işlemleri için gerekli
const jwt = require("jsonwebtoken"); //* JWT token oluşturmak ve doğrulamak için kullanılan jsonwebtoken kütüphanesi

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

    const { username, password, email } = req.body; //* İstek gövdesinden gelen username, email ve password bilgilerini aldık.

    if (!((username || email) && password))
      throw new CustomError("Username/email and password are required", 404); //* Kullanıcı adı veya e-posta ile birlikte şifre girilmediyse hata fırlatır

    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    }); //* Veritabanında girilen e-posta veya kullanıcı adına ve parolaya sahip kullanıcıyı arıyoruz

    if (!user)
      throw new CustomError("Incorrect email/username or password", 401); //* Eğer eşleşen kullanıcı yoksa, giriş bilgileri hatalı demektir.

    if (!user.isActive) throw new CustomError("This account is not active"); //* Kullanıcı hesabı aktif değilse giriş yapamaz, hata döner.

    /*//! -------------------------------- JWT Token ------------------------------- */

    //? Access Token

    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    }; //* Access token için kullanıcıdan gerekli verileri objeye aktardık.

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    }); //* JWT access token'ı oluşturduk, 15 dk geçerli olacak şekilde imzalandı.

    //? Refresh Token

    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    }); //* Refresh token ise yalnızca kullanıcı ID'sini içerir ve 1 gün süreyle geçerli olur

    /*//! -------------------------------------------------------------------------- */

    res.status(200).send({
      error: false,
      bearer: { access: accessToken, refresh: refreshToken },
      user: user,
      message: "Login Success",
    }); //* Giriş başarılıysa access ve refresh token'ları ve kullanıcı bilgilerini gönderiyoruz.
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Logout"
    */
    const auth = req.headers?.authorization; //* Authorization header'ı alıyoruz
    const tokenArr = auth ? auth.split(" ") : null; //* Header varsa boşluklardan ayırıyoruz. Beklenen format "Bearer ...token..."

    if (!(tokenArr && tokenArr[0] === "Bearer" && tokenArr[1]))
      throw new CustomError(
        "Invalid or missing Authorization header. Expected Bearer token"
      ); //* Header yoksa ya da Bearer formatında değilse hata fırlatıyoruz.

    res.status(200).send({
      error: false,
      message: "Logout Success",
    }); //* Çıkış başarılı mesajını gönderiyoruz.
  },
  refresh: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Refresh"
    */
    const { refresh } = req.body; //* Gövdeden gelen refresh token alınır.
    if (!refresh) throw new CustomError("Refresh token not found", 401); //* Token gönderilmediyse hata fırlatılır

    const refreshData = jwt.verify(refresh, process.env.REFRESH_KEY); //* Refresh token doğrulanır. Geçerli değilse hata fırlatır
    if (!refreshData) throw new CustomError("JWT Refresh Token is wrong"); //* Token verisi yoksa geçersizdir.

    const user = await User.findById(refreshData._id); //* Refresh token içindeki kullanıcı ID'ye göre kullanıcı bulunur
    if (!user) throw new CustomError("JWT Refresh Token data is broken"); //* Kullanıcı bulunmazsa token bozulmuş olabilir
    if (!user.isActive) throw new CustomError("This account is not active"); //* Kullanıcı pasifse token üretilemez

    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    }; //* Yeni access token için kullanıcı bilgileri hazırlanır

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    }); //* Yeni access token oluşturulur

    res.status(200).send({
      error: false,
      access: accessToken,
    }); //* Yeni token başarıyla döndürülür
  },
};
