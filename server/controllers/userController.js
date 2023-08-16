const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getAnotherUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const { length } = await User.find();
    data.userId = `USR${length + 1}`;
    data.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(data);
    res.status(201).json({
      status: 'Success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.params.id });
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
