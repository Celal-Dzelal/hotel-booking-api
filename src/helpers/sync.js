"use strict";

module.exports = async function () {
  const { mongoose } = require("../configs/dbConnection"); //* Mongoose bağlantısı "dbConnection" dosyasından destructure edilerek alındı. MongoDB bağlantısı üzerinden işlem yapılacak.

  //*  Environment check: only allow in development
  if (process.env.NODE_ENV !== "development") {
    //* Eğer uygulama çalışma ortamı (environment) "development değilse..."
    throw new Error(
      "This script is allowed to run only in development environment."
    );
    //* ...bir hata fırlatılır. Böylece bu komut yanlışlıkla production ortamında çalıştırılamaz.
  }

  //* Confirmation prompt (CLI)
  const readline = require("readline"); //* Node.js'in yerleşik readline modülü içe aktarıldı. Bu modül terminal üzerinden kullanıcıdan girdi almayı sağlar.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  //* Kullanıcıya soru sormak için arayüz oluşturuldu.

  rl.question(
    "WARNING: This will delete the entire database. Are you sure? (yes/no): ", //* Kullanıcıya uyarı ve onay sorusu sorulur.
    async (answer) => {
      //* Kullanıcı cevabı burada işlenir.
      if (answer.trim().toLowerCase() === "yes") {
        //* Cevap büyük/küçük harf farketmeksizin yes ise...
        try {
          await mongoose.connection.dropDatabase();
          //*... MongoDB veritabanı geri alınamaz şekilde silinir.
          console.log("- Database and all data have been DELETED!");
        } catch (err) {
          //* Silme sırasında hata oluşursa bu blok çalışır
          console.error("An error occurred while deleting the database:", err);
        } finally {
          rl.close(); //* Başarılı ya da hatalı farketmez readline kapatılır.
        }
      } else {
        console.log("Operation cancelled."); //* Yes dışında verilen başka bir cevapta arayüz kapanır.
        rl.close();
      }
    }
  );
};
