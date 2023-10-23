const express = require('express');
const awsController = require('../controllers/awsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/getFileURL')
  .post(
    authController.protect,
    authController.restrictTo('User'),
    awsController.uploadImage,
    awsController.getFileURL,
  );
module.exports = router;
