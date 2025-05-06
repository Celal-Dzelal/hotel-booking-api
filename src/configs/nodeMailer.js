"use strict";

const nodemailer = require("nodemailer"); //* nodemailer paketini projeye dahil ettik. Bu paket e-posta gönderimi yapmaya olanak tanır.

module.exports = nodemailer.createTransport({
  //* createTransport metodu ile bir e-posta gönderim aracı oluşturduk ve dışar aktardık.
  service: "gmail", //* gmail servis sağlayıcısını kullanacağımızı belirttik
  auth: {
    user: process.env.ADMIN_EMAIL, //* gmail hesabı olarak .env dosyasındaki ADMIN_EMAIL değişkeninde tanımlı e-posta adresini kullandık
    pass: process.env.EMAIL_PASS, //* Aynı şekilde şifre olarak .env dosyasındaki EMAIL_PASS değişkenini kullandık.
  },
});
