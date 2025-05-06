"use strict";

const jwt = require("jsonwebtoken"); //* JWT işlemleri için jsonwebtoken paketi import edildi. Bu paket, token doğrulama ve oluşturma işlemlerinde kullanılır.

module.exports = async (req, res, next) => {
  //* Fonksiyon export edildi. Express.js'te route'lar arasında çalışır ve token kontrolü yapar.
  req.user = null; //* Her istekte req.user alanı null olarak başlatılır. Eğer geçerli bir token varsa buraya kullanıcı bilgisi atanır.

  const auth = req.headers?.authorization; //* İsteğin header kısmında "Authorization" varsa alınır. Örneğin: "Bearer ....token...."
  const tokenArr = auth ? auth.split(" ") : null; //* Authorization değeri boş değilse "Bearer" ve token kısmı ayrılır. Örn: ["Bearer","token"]

  if (tokenArr && tokenArr[0] === "Bearer") {
    //* Eğer header gerçekten "Bearer" ile başlıyorsa...
    try {
      jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (error, accessData) => {
        //* İkinci parametre token'dan çözümleme yaparken kullanılan gizli anahtardır(.env'den alınır)
        //* Token doğrulama işlemi yapılır. Eğer geçerliyse "accessData" elde edilir.
        req.user = accessData ? accessData : null;
        //* accessData varsa req.user'a aktarılır. Böylece sonraki middleware veya route'larda kullanıcı bilgisi erişilebilir olur.
      });
    } catch (error) {
      req.user = null; //* Token doğrulama sırasında bir hata oluşursa, req.user null olarak bırakılır.
    }
  }
  next();
};
