const {ValidationError} = require("../utils/ErrorHandlers");
const catchAsync = require("../utils/catchAsync");

const validate = (schema) => {
  return catchAsync(async (req, res, next) => {
    const { error, value } = validateParts(schema, req);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message?.replace(/\"/gi, ""))
        .join(", ");

      return next(new ValidationError(errorMessage));
    }

    // Replace request data with validated values
    if (value.body) req.body = value.body;
    if (value.params) req.params = value.params;
    if (value.query) req.query = value.query;

    next();
  });
};

const validateParts = (schema, req) => {
  const errors = [];
  const value = {};

  ["body", "params", "query"].forEach((key) => {
    if (schema[key]) {
      const result = schema[key].validate(req[key] || {});

      if (result.error) {
        errors.push(...result.error.details);
      }
      value[key] = result.value;
    }
  });

  return {
    error: errors.length ? { details: errors } : null,
    value,
  };
};

module.exports = validate;