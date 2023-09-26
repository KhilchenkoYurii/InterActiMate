const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(postController.getAllPosts);
router.route('/answerPost').post(postController.answerPost);
router
  .route('/leavePost')
  .post(authController.protect, postController.leavePost);
router
  .route('/:id')
  .get(postController.getPost)
  .post(authController.protect, postController.createPost)
  .put(authController.protect, postController.updatePost)
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    postController.deletePost,
  );
router
  .route('/:id/:status')
  .put(authController.protect, postController.changePostStatus);
module.exports = router;
