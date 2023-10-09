const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const google = require('../configs/google');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);
//router.route('/resetPassword/:token').patch(authController.resetPassword);

router.route('/google').get();

router.route('/google/callback').get(google.googleOauthHandler);

router.route('/logout').get(authController.protect, authController.logout);
router
  .route('/updateMyPassword')
  .put(authController.protect, authController.updatePassword);

router
  .route('/updateMe')
  .put(
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe,
  );

router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.getAllUsers,
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.createUser,
  );
router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .put(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.updateUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.deleteUser,
  );
router
  .route('/:id/:userId')
  .get(authController.protect, userController.getAnotherUser);
module.exports = router;
