"use strict";

module.exports = (err, req, res, next) => {
  //* Express.js global error handler olarak tanımlanmış bir fonksiyon export edildi. Bu fonksiyon; uygulamada throw edilen veya middleware'lerde yakalanamayan hataları merkezi olarak yönetmek için kullanılır.
  if (err.statusCode === 400 && err.cause) {
    //* Eğer hata kodu 400 ise ve içinde "cause" bilgisi varsa...
    return res.status(err.statusCode).send({
      error: true,
      message: "Validation failed", //* Sabit hata mesajı
      cause: err.cause, //* Hatanın nedeni
      body: req.body, //* Body'de loglama/inceleme için response'a dahil edilir.
    });
  }

  return res.status(err.statusCode || 500).send({
    //* Eğer yukarıdaki özel durum geçerli değilse, genel hata formatı uygulanır
    error: true,
    message: err.message || "An unexpected error occurred.", //* Hata mesajı varsa gösterilir, yoksa varsayılan genel mesaj gönderilir.
    cause: err.cause || "No additional details", //* cause bilgisi varsa eklenir, yoksa varsayılan bilgi verilir
    body: req.body, //* İstemciden gelen veri loglama amaçlı yine eklenir
  });
};
