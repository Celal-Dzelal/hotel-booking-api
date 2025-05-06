"use strict";

const morgan = require("morgan"); //* HTTP istek loglama aracı olan "morgan" paketi import edildi. Genellikle gelen istekleri detaylı şekilde loglamak için kullanılır.
const fs = require("node:fs"); //* Node.js'in yerleşik dosya sistemi modülü impor edildi. Logları dosyaya yazmak için kullanılır.

const now = new Date(); //* Şu anki tarih ve saat bilgisi alındı
const today = now.toISOString().split("T")[0]; //* ISO formatındaki tarih "YYYY-MM-DDTHH:MM:SSZ" şeklindedir. Bu satırda sadece tarih kısmı alındı.

module.exports = morgan("combined", {
  //* Morgan'ın "combined" formatı kullanıldı. Bu format; IP, istek türü, durum kodu, user-agent gibi birçok bilgiyi içerir.
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
  //* Loglar "./logs/" klasörü altına, o güne ait bir ".log" dosyasına yazılır
  //* {flags: "a+"} -> dosya yoksa oluşturur varsa sonuna ekleme yapar.
});
