"use strict";

const transporter = require("../configs/nodeMailer");

module.exports = function sendMail(to, subject, tempFn, data = null) {
  transporter.sendMail(
    {
      from: process.env.ADMIN_EMAIL,
      to,
      subject,
      html: data ? tempFn(data) : tempFn(),
      text: message,
    },
    function (error, success) {
      success
        ? console.log("**Success**:", success)
        : console.log("!!Error!!:", error);
    }
  );
};
