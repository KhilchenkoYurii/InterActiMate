const qs = require('qs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

async function getGoogleOAuthToken(code) {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID, //config.get('googleClientId'),
    client_secret: process.env.GOOGLE_CLIENT_SECRET, //config.get('googleClientSecret'),
    redirect_uri: process.env.GOOGLE_REDIRECT_URL, //config.get('googleOauthRedirectUrl'),
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return new AppError('Failed to fetch Google Oauth Tokens', 400);
  }
}

async function getGoogleUser(idToken, accessToken) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return new AppError('Error fetching Google user', 400);
  }
}

exports.googleOauthHandler = catchAsync(async (req, res, next) => {
  // get the code from qs
  const { code } = req.query;

  try {
    // get the id and access token with the code
    const data = await getGoogleOAuthToken(code);
    const idToken = data.id_token;
    const accessToken = data.access_token;
    // get user with tokens
    const googleUser = await getGoogleUser(idToken, accessToken);
    //jwt.decode(id_token);

    if (!googleUser.verified_email) {
      return next(new AppError('Google account is not verified')); //res.status(403).send('Google account is not verified');
    }
    const user = await User.findOne({ email: googleUser.email });
    if (!user) {
      const newRandopassword = Math.random().toString(36).slice(-8);
      const registarionData = {
        nickname: googleUser.email.slice(0, googleUser.email.indexOf('@')),
        name: googleUser.given_name,
        surname: googleUser.family_name,
        avatar: googleUser.picture,
        email: googleUser.email,
        password: newRandopassword,
      };
      const lastUser = await User.find().limit(1).sort({ _id: -1 });
      const lastNumber = lastUser[0].userId.slice(3);
      registarionData.userId = `USR${Number(lastNumber) + 1}`;
      const newUser = await User.create(registarionData);
      const id = newUser._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
      };
      console.log(token);
      res.cookie('jwt', token, cookieOptions);
      res.redirect('http://localhost:3001/');
    } else {
      const id = user._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
      };
      res.cookie('jwt', token, cookieOptions);
      console.log(token);
      user.password = undefined;
      res.redirect('http://localhost:3001/');
      // .status(200)
      // .json({
      //   status: 'success',
      //   token: token,
      //   data: {
      //     user: user,
      //   },
      // })
    }
  } catch (error) {
    console.log(error, 'Failed to authorize Google user');
    return res.redirect(`http://localhost:3001/`);
  }
});
