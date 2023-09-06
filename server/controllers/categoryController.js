const Category = require('../models/categoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCategories = catchAsync(async (req, res) => {
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const categories = await features.query;
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({
    $or: [{ categoryId: req.params.Id }, { name: req.params.Id }],
  });
  if (!category) {
    return next(
      new AppError(`No category found with id/name: ${req.params.Id}`, 404),
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const { length } = await Category.find();
  data.categoryId = `CTG${length + 1}`;
  const newCategory = await Category.create(data);
  res.status(201).json({
    status: 'Success',
    data: {
      category: newCategory,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndUpdate(
    { $or: [{ categoryId: req.params.Id }, { name: req.params.Id }] },
    req.body,
    {
      new: true,
    },
  );
  if (!category) {
    return next(
      new AppError(`No category found with id ${req.params.Id}`, 404),
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndDelete({
    $or: [{ categoryId: req.params.Id }, { name: req.params.Id }],
  });
  if (!category) {
    return next(
      new AppError(`No category found with id ${req.params.Id}`, 404),
    );
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
