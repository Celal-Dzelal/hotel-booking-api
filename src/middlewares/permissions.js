"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    //* isLogin isimli middleware fonsksiyonu, kullanıcının oturum açıp açmadığını kotnrol eder.
    if (req.user && req.user.isActive) {
      //* Eğer req.user nesnesi varsa ve kullanıcı aktifse işlemlere devam edilir.
      next();
    } else {
      res.errorStatusCode = 403; //* Hata durumunda response nesnesine özel bir hata kodu atanır. (Forbidden)
      throw new Error("NoPermission: You must login.");
    }
  },
};
