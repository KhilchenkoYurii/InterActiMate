const Message = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    if (req.params.Id.includes('MSG')) {
      const message = await Message.findOne({
        messageId: req.params.Id,
      });
      res.status(200).json({
        status: 'success',
        data: {
          message,
        },
      });
    } else if (req.params.Id.includes('USR')) {
      const messages = await Message.find({ sender: req.params.Id });
      res.status(200).json({
        status: 'success',
        data: {
          messages,
        },
      });
    } else if (req.params.Id.includes('CHT')) {
      const messages = await Message.find({ chatId: req.params.Id });
      res.status(200).json({
        status: 'success',
        data: {
          messages,
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

exports.createMessage = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      { messageId: req.params.Id },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findOneAndDelete({ messageId: req.params.Id });
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
