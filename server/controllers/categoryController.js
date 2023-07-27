const Category = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      $or: [{ categoryId: req.params.Id }, { name: req.params.Id }],
    });
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { $or: [{ categoryId: req.params.Id }, { name: req.params.Id }] },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message || err,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({
      $or: [{ categoryId: req.params.Id }, { name: req.params.Id }],
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
