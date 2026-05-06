const errorHandlingMiddleware = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(400).send(errors);
  }

  // Handle all other errors instead of silently dropping them
  console.error("Unhandled Error:", err.message);
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandlingMiddleware;
