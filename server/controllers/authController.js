// const passport = require('passport');
// const LocalStrategy = require('passport-local');

const jwt = require('jsonwebtoken');
//const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const data = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password,
  };
  const lastUser = await User.find().limit(1).sort({ _id: -1 });
  const lastNumber = lastUser[0].userId.slice(3);
  data.userId = `USR${Number(lastNumber) + 1}`;
  const newUser = await User.create(data);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please, fill email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError(`User with email ${email} doesn not exist!`, 401));
  }
  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError(`Incorrect password for email ${email}!`, 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1 check if token came with request
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(`User does not authorizated!`, 401));
  }
  // 2 verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3 check if user still exist
  const currentUser = await User.findById(decoded.id).select('+role');
  if (!currentUser) {
    return next(new AppError(`User does not exist!`, 401));
  }
  // 4 check if user did not change password

  if (currentUser.changePasswordAfter(decoded.iat) === true) {
    return next(
      new AppError(
        `User recently changed password! Please, log in again!`,
        401,
      ),
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    // roles admin
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`User have no permissions to do this action!`, 403),
      );
    }
    next();
  });
