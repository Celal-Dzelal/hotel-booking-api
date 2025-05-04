"use strict";

const { mongoose } = require("../configs/dbConnection");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "token" }
);

module.exports = mongoose.model("Token", TokenSchema);
