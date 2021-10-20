const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      success: false,
      error,
      errorMessage: error.message,
      stack: error.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let errorCopy = { ...error };
    errorCopy.message = error.message;

    //Wrong mongoose object ID error:
    if (error.name === "CastError") {
      const message = `Resource not found. Invalid: ${error.path}`;
      errorCopy = new ErrorHandler(message, 400);
    }

    //Handling mongoose duplicate key error:
    if (error.code === 11000) {
      const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
      errorCopy = new ErrorHandler(message, 400);
    }

    res.status(errorCopy.statusCode).json({
      success: false,
      message: errorCopy.message || "Internal server error.",
    });
  }
};
