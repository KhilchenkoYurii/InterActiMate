const express = require('express');
const attachmentController = require('../controllers/attachmentController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    attachmentController.getAllAttachments,
  )
  .post(authController.protect, attachmentController.createAttachment);
router
  .route('/:Id')
  .get(authController.protect, attachmentController.getAttachment)
  .put(authController.protect, attachmentController.updateAttachment)
  .delete(authController.protect, attachmentController.deleteAttachment);
module.exports = router;
