"use strict";

const transporter = require("../configs/nodeMailer"); //* Daha önce oluşturduğumuz ve yapılandırdığımız transporter nesnesini içe aktardık.

module.exports = function sendMail(to, subject, tempFn, data = null) {
  //* sendMail adında bir fonksiyon tanımlayarak dışa aktardık. to: alıcı e-posta adresi. subject: eposta başlığı. tempfn: html template fonksiyonu. data: template'ye gönderilecek opsiyonal veri.
  transporter.sendMail(
    {
      from: process.env.ADMIN_EMAIL, //* gönderen eposta adresi .env dosyasından alınır
      to, //* mailin gönderileceği adres parametre ile gelir
      subject, //* mailin konusu (başlığı)
      html: data ? tempFn(data) : tempFn(), //* Eğer data varsa template fonksiyonuna bu veri gönderilir ve dinamik HTML oluşturulur. Yoksa template fonksiyonu verisiz çalışır.
      text: message,
    },
    function (error, success) {
      //* sendMail fonksiyonu asenkron çalışır ve sonucu callback fonksiyon ile verir.
      success
        ? console.log("**Success**:", success)
        : console.log("!!Error!!:", error);
    } //* İşlem başarılıysa konsola başarı mesajı, değilse hata mesajı verir
  );
};
