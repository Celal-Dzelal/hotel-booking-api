"use strict";

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validate;
