const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require("../middlewares/asyncHandler");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//@POST   api/v1/register
//@desc   register a user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return next(new ErrorHandler("Passwords dont match!"));

  const user = await User.create({
    name,
    email,
    password,
  });

  const verificationToken = user.getEmailVerificationToken();

  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/email/verify/${verificationToken}`;

  const message = `Your Email verification token is as follows:\n\n${verificationUrl}\n\nIf you did not create account then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "TSR Email Verification",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Verification sent to ${user.email}`,
    });
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.verifyEmail = asyncHandler(async (req, res, next) => {
  // Hash url token
  const emailVerificationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("Email Verification token is invalid or expired", 400)
    );

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Email Verified! You may log in now.",
  });
});

//@POST    api/v1/login
//@desc    Login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password is entered by user:
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //Find user in database:
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email/Password", 401));

  if (user.isVerified === false)
    return next(new ErrorHandler("Please verify your email", 400));

  //Check if password is correct:
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid)
    return next(new ErrorHandler("Invalid Email/Password", 401));

  sendToken(user, 200, res);
});

//@GET    api/v1/logout
//@desc   Logout user
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged out" });
});

//@POST   api/v1/password/forgot
//@desc   forgot password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorHandler("User not found with this email", 404));
  //Get reset token:
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested password change then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "TSR password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// @POST  api/v1/password/reset/:token
// @Desc  reset password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("Password reset token is invalid or expired", 400)
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password does not match", 400));

  //Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//GET      /api/v1/me
//@desc    Get currently logged in user
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

//PUT      /api/v1/password/update
//@Desc    Update / Change password
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) return next(new ErrorHandler("Incorrect password", 400));

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//PUT     /api/v1/me/update
//@Desc   Update user profile
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
});

// Admin Routes

//@GET     api/v1/admin/users
//@Desc    Get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//@GET     api/v1/admin/users/:id
//@Desc    Get user details
exports.getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({ success: true, user });
});

//@PUT    api/v1/admin/user/:id
//@Desc   Update user details and roles etc
exports.updateUser = asyncHandler(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
});

//@DELETE    api/v1/admin/user/:id
//@Desc      Delete user - ADMIN
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new ErrorHandler(`User not found with this id: ${req.params.id}`, 404)
    );

  await user.remove();

  res.status(200).json({ success: true });
});
