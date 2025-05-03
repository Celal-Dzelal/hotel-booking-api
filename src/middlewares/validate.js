"use strict";

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      if (error.errors) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path[1],
          message: err.message,
        }));

        const validationError = new Error("Validation failed");
        validationError.statusCode = 400;
        validationError.cause = formattedErrors;
        return next(validationError);
      }
      next(error);
    }
  };
}

module.exports = validate;
