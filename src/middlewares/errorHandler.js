"use strict";

module.exports = (err, req, res, next) => {
  if (err.statusCode === 400 && err.cause) {
    return res.status(err.statusCode).send({
      error: true,
      message: "Validation failed",
      cause: err.cause,
      body: req.body,
    });
  }

  return res.status(err.statusCode || 500).send({
    error: true,
    message: err.message || "An unexpected error occurred.",
    cause: err.cause || "No additional details",
    body: req.body,
  });
};
