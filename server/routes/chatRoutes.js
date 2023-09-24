const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    chatController.getAllChats,
  );
router
  .route('/:chatId')
  .get(authController.protect, chatController.getChat)
  .put(authController.protect, chatController.updateChat)
  .delete(authController.protect, chatController.deleteChat);
router
  .route('/:ownerId')
  .post(authController.protect, chatController.createChat);
module.exports = router;
