const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();

router
  .route('/')
  .get(MessageController.getAllMessages)
  .post(MessageController.createMessage);
router
  .route('/:Id')
  .get(MessageController.getMessage)
  .put(MessageController.updateMessage)
  .delete(MessageController.deleteMessage);
module.exports = router;
