const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostStatuses = require('../configs/postStatuses');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPosts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const posts = await features.query;
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ postId: req.params.id });
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  const { length } = await Post.find();
  data.postId = `PST${length + 1}`;
  const user = await User.findOne({ userId: req.params.id });
  data.owner = user.userId;
  data.dateOfCreation = new Date();
  const newPost = await Post.create(data);
  user.createdPosts.push(newPost.postId);
  await User.findOneAndUpdate(
    { userId: user.userId },
    { createdPosts: user.createdPosts },
  );
  res.status(201).json({
    status: 'Success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    { postId: req.params.id },
    req.body,
    {
      new: true,
    },
  );
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndDelete({ postId: req.params.id });
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.changePostStatus = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!PostStatuses.hasOwnProperty(req.params.status)) {
    return next(new AppError(`Incorrect status`, 400));
  }
  const post = await Post.findOneAndUpdate(
    { postId: req.params.id },
    { status: req.params.status },
    { new: true },
  );
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: post,
  });
});
