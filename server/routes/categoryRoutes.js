const express = require('express');
const сategoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(сategoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    сategoryController.createCategory,
  );
router
  .route('/:Id')
  .get(authController.protect, сategoryController.getCategory)
  .put(
    authController.protect,
    authController.restrictTo('Admin'),
    сategoryController.updateCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    сategoryController.deleteCategory,
  );
module.exports = router;
