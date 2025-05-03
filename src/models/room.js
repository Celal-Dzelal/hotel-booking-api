"use strict";

const { mongoose } = require("../configs/dbConnection");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      unique: true,
      required: true,
      min: [101, "Room number must be between 101 and 199"],
      max: [199, "Room number must be between 101 and 199"],
    },
    image: [String],
    roomType: {
      type: String,
      trim: true,
      required: true,
      enum: {
        values: [
          "Double",
          "Single",
          "Triple",
          "Quadruple",
          "Presidential",
          "Suit",
          "Twin",
        ],
        message:
          "Room type must be one of the following: Double, Single, Triple, Quadruple, Presidential, Suit, Twin",
      },
    },
    price: {
      type: Number,
      required: true,
      default: 500,
    },
  },
  { collection: "rooms", timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
