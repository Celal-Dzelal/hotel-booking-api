"use strict";

module.exports = async function () {
  const { mongoose } = require("../configs/dbConnection");

  //*  Environment check: only allow in development
  if (process.env.NODE_ENV !== "development") {
    throw new Error(
      "This script is allowed to run only in development environment."
    );
  }

  //* Confirmation prompt (CLI)
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "WARNING: This will delete the entire database. Are you sure? (yes/no): ",
    async (answer) => {
      if (answer.trim().toLowerCase() === "yes") {
        try {
          await mongoose.connection.dropDatabase();
          console.log("- Database and all data have been DELETED!");
        } catch (err) {
          console.error("An error occurred while deleting the database:", err);
        } finally {
          rl.close();
        }
      } else {
        console.log("Operation cancelled.");
        rl.close();
      }
    }
  );
};
