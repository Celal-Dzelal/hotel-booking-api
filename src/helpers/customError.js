"use strict";

class CustomError extends Error {
  //* Error sınıfından miras alarak özel bir hata sınıfı oluşturduk
  name = "CustomError"; //* Hata nesnesinin adını "CustomError" olarak belirledik
  constructor(message, statusCode = 500) {
    //* Constructor fonksiyon hata mesajı ve durum kodunu parametre olarak alır. Eğer statusCode verilmezse varsayılan olarak 500 kullanır.
    super(message); //* Error sınıfının contructor'ına hata mesajını ilettik
    this.statusCode = statusCode; //* Oluşan hataya ait HTTP status kodunu bu sınıfa ait bir özellik olarak kaydettik
  }
}

module.exports = CustomError;
