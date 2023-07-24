const express = require('express');
const ChatController = require('../controllers/chatController');

const router = express.Router();

router.route('/').get(ChatController.getAllChats);
router
  .route('/:chatId')
  .get(ChatController.getChat)
  .delete(ChatController.deleteChat);
router
  .route('/:ownerId')
  .get(ChatController.getChatsByUserId)
  .post(ChatController.createChat);
module.exports = router;
