const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentModel = require("../Model/StudentSchema");
const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const setToken = require("../utils/jsonWebToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// REGISTER STUDENT
exports.registerStudent = asyncErr(async (req, res, next) => {
  const { name, email, password } = req.body;

  // FILLING ALL THE FIELDS -
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const user = await studentModel.findOne({ email });

  if (user === null) {
    await studentModel.create({ name, email, password });
    // sendVerifyEmail(req.body.name, req.body.email, user._id);
    res.status(201).json({
      success: true,
      message: "You are registered! Please login to proceed",
    });
  } else {
    res.status(406).json({
      message: "Student already exists",
    });
  }
});

// LOGIN Student -
exports.loginStudent = asyncErr(async (req, res, next) => {
  const { email, password } = req.body;

  // FILLING ALL THE FIELDS -
  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const user = await studentModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // VALIDATE PASSWORD -
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  setToken(user, 200, res);
});

// LOGOUT Student -
exports.logoutStudent = asyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// GET STUDENT DETAILS -
exports.getStudentDetails = asyncErr(async (req, res) => {
  const user = await studentModel.findById(req.Student._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// FORGOT PASSWORD FOR STUDENT -
exports.forgotPassword = asyncErr(async (req, res, next) => {
  if (req.body.email === undefined) {
    return next(new ErrorHandler("Please enter your email", 400));
  }

  const student = await studentModel.findOne({ email: req.body.email });

  if (!student) return next(new ErrorHandler("User not found", 404));

  const resetToken = student.ResetPasswordToken();

  await student.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your requested reset password link has been generated:\n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: student.email,
      subject: "FYP Password Recovery",
      html: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${student.email}`,
    });
  } catch (err) {
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// RESET PASSWORD FOR STUDENT -
exports.resetPassword = asyncErr(async (req, res, next) => {
  const token = req.params.token;
  resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const student = await studentModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!student) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password did not match", 400));
  }

  student.password = req.body.password;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpire = undefined;

  await student.save();

  setToken(student, 200, res);
});
