const express = require('express');
const AttachmentController = require('../controllers/attachmentController');

const router = express.Router();

router
  .route('/')
  .get(AttachmentController.getAllAttachments)
  .post(AttachmentController.createAttachment);
router
  .route('/:Id')
  .get(AttachmentController.getAttachment)
  .put(AttachmentController.updateAttachment)
  .delete(AttachmentController.deleteAttachment);
module.exports = router;
