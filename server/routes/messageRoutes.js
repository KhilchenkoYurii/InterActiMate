const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    messageController.getAllMessages,
  )
  .post(authController.protect, messageController.createMessage);
router
  .route('/:Id')
  .get(authController.protect, messageController.getMessage)
  .put(authController.protect, messageController.updateMessage)
  .delete(authController.protect, messageController.deleteMessage);
module.exports = router;
