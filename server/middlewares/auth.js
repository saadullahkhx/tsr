const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Verify if user is authenticated
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Login to access this resource."));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
