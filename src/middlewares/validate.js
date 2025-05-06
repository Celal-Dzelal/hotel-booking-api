"use strict";

function validate(schema) {
  //* validate adında bir fonksiyon tanımlandı ve bir schema parametresi alıyor. Bu schema, genellikle Zod, Joi, Yup gibi bir doğrulama kütüphanesinden gelen yapıdır.
  return (req, res, next) => {
    //* validate fonksiyonu bir middleware döndürür. Middleware'ler Express içinde request öncesi kontrol amaçlı kullanılır.
    try {
      schema.parse({
        body: req.body,
      });
      //* Gelen request'in "body" kısmı belirtilen şemaya göre kontrol edilir.
      //* "schema.parse()" -> eğer doğrulama başarılıysa hiçbir şey yapmadan devam eder.
      next();
    } catch (error) {
      //* Eğer "parse" işlemi sırasında bir hata oluşursa (örneğin zorunlu bir alan eksikse)...
      if (error.errors) {
        //* Eğer hata "schema" tarafından üretilmişse ve içinde "errors" dizisi varsa...
        const formattedErrors = error.errors.map((err) => ({
          field: err.path[1], //* Hangi alan hatalıysa onun adı alınır (path[1], çünkü "body" altındaki alan)
          message: err.message, //* Hatanın mesajı eklenir
        }));

        const validationError = new Error("Validation failed"); //* Yeni bir hata nesnesi oluşturulur ve daha anlamlı hale getirilir
        validationError.statusCode = 400; //* HTTP 400  olarak işaretlenir
        validationError.cause = formattedErrors; //* Hatanın nedenleri detaylı biçimde cause içine aktarılır
        return next(validationError); //* Oluşturulan hata, Express'in global error handler'ına iletilir
      }
      next(error);
    }
  };
}

module.exports = validate;
