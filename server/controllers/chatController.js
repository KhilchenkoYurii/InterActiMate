const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllChats = catchAsync(async (req, res) => {
  const features = new APIFeatures(Chat.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const Chats = await features.query;
  res.status(200).json({
    status: 'success',
    results: Chats.length,
    data: {
      Chats,
    },
  });
});

exports.getChat = catchAsync(async (req, res, next) => {
  if (req.params.chatId.includes('CHT')) {
    const chat = await Chat.findOne({ chatId: req.params.chatId });
    if (!chat) {
      return next(
        new AppError(`No chat found with id ${req.params.chatId}`, 404),
      );
    }
    const messages = await Message.find({ chatId: chat.chatId });
    res.status(200).json({
      status: 'success',
      data: {
        chat,
        messages,
      },
    });
  } else if (req.params.chatId.includes('USR')) {
    const user = await User.findOne({ userId: req.params.chatId });
    if (!user) {
      return next(
        new AppError(`No user found with id ${req.params.chatId}`, 404),
      );
    }
    const chats = await Chat.find({ chatId: { $in: user.chats } });
    const newChats = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const chatOne of chats) {
      const updatedChat = {
        chatId: '',
        ownerId: '',
        participatorsName: '',
        participatorsAvatar: '',
        firstMessage: '',
      };
      updatedChat.chatId = chatOne.chatId;
      updatedChat.ownerId = chatOne.ownerId;
      const participator = await User.findOne({ userId: chatOne.chatUsers[0] });
      updatedChat.participatorsName = participator.nickname;
      updatedChat.participatorsAvatar = participator.avatar;
      const firstMessage = await Message.findOne({
        chatId: chatOne.chatId,
      })
        .limit(1)
        .sort({ _id: -1 });
      if (firstMessage) {
        updatedChat.firstMessage = firstMessage.body;
      } else {
        updatedChat.firstMessage = 'Натисніть для початку розмови';
      }
      newChats.push(updatedChat);
    }

    // participation name, participation avatar, first message
    await res.status(200).json({
      status: 'success',
      data: {
        newChats,
      },
    });
  }
});

exports.createChat = catchAsync(async (req, res) => {
  const data = req.body;
  const lastChat = await Chat.find().limit(1).sort({ _id: -1 });
  const lastNumber = lastChat[0].chatId.slice(3);
  data.chatId = `CHT${Number(lastNumber) + 1}`;
  const owner = await User.findOne({ userId: req.params.ownerId });
  const participator = await User.findOne({
    userId: req.body.chatUsers[0],
  });
  data.ownerId = owner.userId;
  const newChat = await Chat.create(data);
  owner.chats.push(newChat.chatId);
  participator.chats.push(newChat.chatId);
  await User.findOneAndUpdate({ userId: owner.userId }, { chats: owner.chats });
  await User.findOneAndUpdate(
    { userId: participator.userId },
    { chats: participator.chats },
  );
  res.status(201).json({
    status: 'Success',
    data: {
      chat: newChat,
    },
  });
});

exports.updateChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findOneAndUpdate(
    { chatId: req.params.chatId },
    req.body,
    {
      new: true,
    },
  );
  if (!chat) {
    return next(
      new AppError(`No chat found with id ${req.params.chatId}`, 404),
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      chat,
    },
  });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  const chatUsers = await User.find({ chats: req.params.chatId });
  if (!chatUsers) {
    return next(
      new AppError(`No chat found with id ${req.params.chatId}`, 404),
    );
  }
  chatUsers.forEach(async (user) => {
    user.chats = user.chats.filter((chat) => chat !== req.params.chatId);
    await User.findOneAndUpdate(
      { userId: user.userId },
      { chats: user.chats },
      {
        new: true,
      },
    );
  });
  const chat = await Chat.findOneAndDelete({ chatId: req.params.chatId });
  if (!chat) {
    return next(
      new AppError(`No chat found with id ${req.params.chatId}`, 404),
    );
  }
  await Message.deleteMany({ chatId: req.params.chatId });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
