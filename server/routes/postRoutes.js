const express = require('express');
const PostController = require('../controllers/postController');

const router = express.Router();

router.route('/').get(PostController.getAllPosts);
router.route('/answerPost').post(PostController.answerPost);
router.route('/leavePost').post(PostController.leavePost);
router
  .route('/:id')
  .get(PostController.getPost)
  .post(PostController.createPost)
  .put(PostController.updatePost)
  .delete(PostController.deletePost);
router.route('/:id/:status').put(PostController.changePostStatus);
module.exports = router;
