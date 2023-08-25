const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostStatuses = require('../configs/postStatuses');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPosts = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { postId: req.params.id },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findOneAndDelete({ postId: req.params.id });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.changePostStatus = async (req, res) => {
  try {
    // eslint-disable-next-line no-prototype-builtins
    if (PostStatuses.hasOwnProperty(req.params.status)) {
      const post = await Post.findOneAndUpdate(
        { postId: req.params.id },
        { status: req.params.status },
        { new: true },
      );
      if (post === null) {
        res.status(400).json({
          status: 'Failed',
          message: 'Post not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: post,
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Incorrect status',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};
