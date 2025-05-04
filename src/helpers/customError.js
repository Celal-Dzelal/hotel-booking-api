"use strict";

class CustomError extends Error {
  name = "CustomError";
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
