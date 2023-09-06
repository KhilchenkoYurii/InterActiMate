const Message = require('../models/messageModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllMessages = catchAsync(async (req, res) => {
  const features = new APIFeatures(Message.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const messages = await features.query;
  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages,
    },
  });
});

exports.getMessage = catchAsync(async (req, res, next) => {
  let messages;
  if (req.params.Id.includes('MSG')) {
    messages = await Message.find({ messageId: req.params.Id });
    if (messages.length === 0) {
      return next(
        new AppError(`No message found with id ${req.params.Id}`, 404),
      );
    }
  } else if (req.params.Id.includes('USR')) {
    messages = await Message.find({ sender: req.params.Id });
    if (messages.length === 0) {
      return next(
        new AppError(
          `No messages found for user with id ${req.params.Id}`,
          404,
        ),
      );
    }
  } else if (req.params.Id.includes('CHT')) {
    messages = await Message.find({ chatId: req.params.Id });
    if (messages.length === 0) {
      return next(
        new AppError(
          `No messages found for chat with id ${req.params.Id}`,
          404,
        ),
      );
    }
  }
  res.status(200).json({
    status: 'success',
    data: {
      messages,
    },
  });
});

exports.createMessage = catchAsync(async (req, res) => {
  const data = req.body;
  const { length } = await Message.find();
  const date = new Date().toISOString();
  data.messageId = `MSG${length + 1}_${date}`;
  const newMessage = await Message.create(data);
  res.status(201).json({
    status: 'Success',
    data: {
      message: newMessage,
    },
  });
});

exports.updateMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findOneAndUpdate(
    { messageId: req.params.Id },
    req.body,
    {
      new: true,
    },
  );
  if (!message) {
    return next(new AppError(`No message found with id ${req.params.Id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      message,
    },
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findOneAndDelete({ messageId: req.params.Id });
  if (!message) {
    return next(new AppError(`No message found with id ${req.params.Id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
