const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const authController = require('../controllers/authController');

dotenv.config({ path: './config.env' });
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID.toString(),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/users/oauth2/redirect/google',
        passReqToCallback: true,
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
      },
      async (req, accessToken, refreshToken, profile, next, res) => {
        console.log(profile);
        if (profile.id_token) {
          const decoded = await jwt.decode(profile.id_token);
          // 3 check if user still exist
          const currentUser = await User.findOne({
            email: decoded.email,
          }).select('+role');
          if (!currentUser) {
            res.status(404).json({
              status: 'fail',
              message: `User does not exist!`,
            });
          }
          // 4 check if user did not change password
          req.user = currentUser;
          const token = profile.id_token;
          const cookieOptions = {
            expires: decoded.exp,
            httpOnly: true,
          };
          // if (process.env.NODE_ENV === 'production') {
          //   cookieOptions.secure = true;
          // }
          res.cookie('jwt', token, cookieOptions);
          res.status(200).json({
            status: 'success',
            token: token,
            data: {
              user: currentUser,
            },
          });
        } else {
          const lastUser = await User.find().limit(1).sort({ _id: -1 });
          const lastNumber = lastUser[0].userId.slice(3);
          const tempUserId = `USR${Number(lastNumber) + 1}`;
          const newUser = {
            userId: tempUserId,
            nickname: profile.displayName,
            name: profile.name.givenName,
            surname: profile.name.familyName,
            avatar: profile.photos[0].value,
            email: profile.emails[0].value,
          };
        }
        // try {
        //   //find the user in our database
        //   // let user = await User.findOne({
        //   //   email: profile.emails[0].value,
        //   // });
        //   let user;
        //   if (user) {
        //     //If user present in our database.
        //     req.user = user;
        //     authController.createSendToken(newUser, 200, res);
        //   } else {
        //     // if user is not preset in our database save user data to database.
        //     user = await newUser.save({ validateBeforeSave: false });
        //     authController.createSendToken(newUser, 201, res);
        //     //done(null, user);
        //   }
        // } catch (err) {
        //   console.error(err);
        // }
      },
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
