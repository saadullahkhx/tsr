const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Your name can not exceed 30 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be 6 characters or longer."],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Generate password reset Token
userSchema.methods.getResetPasswordToken = function () {
  //generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; //Expires in 30 minutes.

  return resetToken;
};

//Encrypting password before saving:
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Return JWT Token:
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//Compare user password:
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
