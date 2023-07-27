const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

exports.getAllChats = async (req, res) => {
  try {
    const Chats = await Chat.find();
    res.status(200).json({
      status: 'success',
      results: Chats.length,
      data: {
        Chats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getChat = async (req, res) => {
  try {
    if (req.params.chatId.includes('CHT')) {
      const chat = await Chat.findOne({ chatId: req.params.chatId });
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
      const chats = await Chat.find({ chatId: { $in: user.chats } });
      res.status(200).json({
        status: 'success',
        data: {
          chats,
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

exports.createChat = async (req, res) => {
  try {
    const data = req.body;
    const { length } = await Chat.find();
    data.chatId = `CHT${length + 1}`;
    const owner = await User.findOne({ userId: req.params.ownerId });
    const participator = await User.findOne({
      userId: req.body.chatUsers[0],
    });
    data.ownerId = owner.userId;
    const newChat = await Chat.create(data);
    owner.chats.push(newChat.chatId);
    participator.chats.push(newChat.chatId);
    await User.findOneAndUpdate(
      { userId: owner.userId },
      { chats: owner.chats },
    );
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.updateChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { chatId: req.params.chatId },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        chat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const chatUsers = await User.find({ chats: req.params.chatId });
    // eslint-disable-next-line no-restricted-syntax
    // for (const user of chatUsers) {
    //   user.chats = user.chats.filter((chat) => chat !== req.params.chatId);
    //   User.findOneAndUpdate(
    //     { userId: user.userId },
    //     { chats: user.chats },
    //     {
    //       new: true,
    //     },
    //   );
    // }
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
    await Chat.findOneAndDelete({ chatId: req.params.chatId });
    await Message.deleteMany({ chatId: req.params.chatId });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};
