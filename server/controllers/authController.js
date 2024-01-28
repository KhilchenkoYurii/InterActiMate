const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

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
  // if (process.env.NODE_ENV === 'production') {
  //   cookieOptions.secure = true;
  // }
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
    name: req.body.name,
    surname: req.body.surname,
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
  if (await currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        `User recently changed password or logged out! Please, log in again!`,
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1 Get user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There is no user with this email!`, 404));
  }
  //2 generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3 send it to user`s email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/create-new-password?token=${resetToken}`;

  const message = `Забули свій пароль? Оновіть його за цим посиланням ${resetURL}\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ваш новий пароль',
      message,
    });
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, message: 'Password sent to email' });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;

    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(`There was error sending the email. Try again later`, 500),
    );
  }
  //createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1 get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2 check if POSTed currecnt password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(`Your current password is wrong!`, 401));
  }
  // 3 if so, updates password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4 log user in, sent JWT
  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser) {
    return next(new AppError(`User does not exist!`, 401));
  }
  currentUser.passwordChangedAt = Date.now();
  await User.findByIdAndUpdate(currentUser.id, {
    passwordChangedAt: currentUser.passwordChangedAt,
  });
  res.status(200).json({
    status: 'success',
    message: 'User logged out',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1 get user based on token
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpired: { $gte: Date.now() },
  });
  // 2 if token not expired and user exist set new password
  if (!user) {
    return next(new AppError(`Token expired! Please, try again.`, 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();
  // 3 updates changedPasswordAt for user
  // 4 log the user send JWT token
  createSendToken(user, 200, res);
});
