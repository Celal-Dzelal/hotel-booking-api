"use strict";

const { mongoose } = require("../configs/dbConnection");

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
    arrivalDate: {
      type: Date,
      required: true,
      default: () => new Date(),
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Arrival date must be now or in the future.",
      },
    },
    departureDate: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    guestNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    night: {
      type: Number,
      default: function () {
        return (
          Math.round(this.departureDate - this.arrivalDate) /
          (1000 * 60 * 60 * 24)
        );
      },
      min: [1, "Departure date must be later than arrival date"],
    },
    price: {
      type: Number,
      default: 500,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.night * this.price * this.guestNumber;
      },
    },
  },
  { collection: "reservations", timestamps: true }
);

ReservationSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.arrivalDate = ret.arrivalDate.toLocaleDateString("tr-tr");
    ret.departureDate = ret.departureDate.toLocaleDateString("tr-tr");
    return ret;
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
