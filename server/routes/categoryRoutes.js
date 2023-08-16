const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router
  .route('/')
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createCategory);
router
  .route('/:Id')
  .get(CategoryController.getCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);
module.exports = router;
