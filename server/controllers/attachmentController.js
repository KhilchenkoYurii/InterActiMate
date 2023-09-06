const Attachment = require('../models/attachmentModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAttachments = catchAsync(async (req, res) => {
  const features = new APIFeatures(Attachment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const attachments = await features.query;
  res.status(200).json({
    status: 'success',
    results: attachments.length,
    data: {
      attachments,
    },
  });
});

exports.getAttachment = catchAsync(async (req, res, next) => {
  const attachments = await Attachment.find({
    $or: [{ attachmentId: req.params.Id }, { ownerId: req.params.Id }],
  });
  if (attachments.length === 0) {
    return next(
      new AppError(`No attachments found with id ${req.params.Id}`, 404),
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      attachments,
    },
  });
});

exports.createAttachment = catchAsync(async (req, res) => {
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
});

exports.updateAttachment = catchAsync(async (req, res, next) => {
  const attachment = await Attachment.findOneAndUpdate(
    { attachmentId: req.params.Id },
    req.body,
    {
      new: true,
    },
  );
  if (!attachment) {
    return next(
      new AppError(`No attachment found with id ${req.params.Id}`, 404),
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      attachment,
    },
  });
});

exports.deleteAttachment = catchAsync(async (req, res, next) => {
  const attachment = await Attachment.findOneAndDelete({
    attachmentId: req.params.Id,
  });
  if (!attachment) {
    return next(
      new AppError(`No attachment found with id ${req.params.Id}`, 404),
    );
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
