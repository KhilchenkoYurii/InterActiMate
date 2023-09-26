const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const users = await features.query;
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.id });
  if (!user) {
    return next(new AppError(`No user found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getAnotherUser = catchAsync(async (req, res, next) => {
  // can by replaced by using filters in query params of request
  const user = await User.findOne({ userId: req.params.userId });
  if (!user) {
    return next(
      new AppError(`No user found with id ${req.params.userId}`, 404),
    );
  }
  if (user.showOnlyNickname) {
    res.status(200).json({
      status: 'success',
      data: {
        userId: user.userId,
        nickname: user.nickname,
        bio: user.bio,
        createdPosts: user.createdPosts,
      },
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        userId: user.userId,
        nickname: user.nickname,
        name: user.name,
        surname: user.surname,
        bio: user.bio,
        createdPosts: user.createdPosts,
      },
    });
  }
});

exports.createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const lastUser = await User.find().limit(1).sort({ _id: -1 });
  const lastNumber = lastUser[0].userId.slice(3);
  data.userId = `USR${Number(lastNumber) + 1}`;
  const newUser = await User.create(data);
  res.status(201).json({
    status: 'Success',
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { userId: req.params.id },
    req.body,
    {
      new: true,
    },
  );
  if (!user) {
    return next(new AppError(`No user found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1 error is user POST password data
  if (req.body.password) {
    return next(new AppError(`This route is not for password change!`, 400));
  }
  // 2 filter body
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'avatar',
    'showOnlyNickname',
    'bio',
    'phone',
    'surname',
    'nickname',
  );
  // 3 update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { status: 'Deactivated' });
  //1 error is user POST password data
  res.status(204).json({
    status: 'success',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ userId: req.params.id });
  if (!user) {
    return next(new AppError(`No user found with id ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
