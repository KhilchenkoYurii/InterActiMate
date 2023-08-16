const Attachment = require('../models/attachmentModel');

exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find();
    res.status(200).json({
      status: 'success',
      results: attachments.length,
      data: {
        attachments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const attachments = await Attachment.find({
      $or: [{ attachmentId: req.params.Id }, { ownerId: req.params.Id }],
    });
    res.status(200).json({
      status: 'success',
      data: {
        attachments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.createAttachment = async (req, res) => {
  try {
    const data = req.body;
    const { length } = await Attachment.find();
    data.attachmentId = `ATT${length + 1}`;
    const newAttachment = await Attachment.create(data);
    res.status(201).json({
      status: 'Success',
      data: {
        attachment: newAttachment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.updateAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findOneAndUpdate(
      { attachmentId: req.params.Id },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        attachment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deleteAttachment = async (req, res) => {
  try {
    await Attachment.findOneAndDelete({
      attachmentId: req.params.Id,
    });
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
