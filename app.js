const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { default: mongoose } = require('mongoose');

const userRouter = require('./server/routes/userRoutes');
const postRouter = require('./server/routes/postRoutes');
const chatRouter = require('./server/routes/chatRoutes');
const messageRouter = require('./server/routes/messageRoutes');
const categoryRouter = require('./server/routes/categoryRoutes');
const attachmentRouter = require('./server/routes/attachmentRoutes');
//const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');
require('./server/configs/passport')(passport);

const app = express();
// serve up production assets
//set security http headers
app.use(helmet());
//request limitation
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try in an hour',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization agains noSQL query injection
app.use(mongoSanitize());

//data sanitazion agains XSS
app.use(xssClean());

//prevent parameter polution
app.use(hpp());

app.use(express.static('client/build'));
app.use(cors({ origin: `http://localhost:3001` }, { withCredentials: true }));
// let the react app to handle any unknown routes${process.env.PORT || 3001}
// serve up the index.html if express does'nt recognize the route
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  }),
);
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ moongooseConnection: mongoose.connect }),
//   }),
// );
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', userRouter);
app.use('/posts', hpp({ whitelist: ['postId'] }), postRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);
app.use('/categories', categoryRouter);
app.use('/attachments', attachmentRouter);
app.all('*', (req, res, next) => {
  const router = path.resolve(__dirname, 'client', 'build', `index.html`);
  res.sendFile(router);
});
// error handeling does not works with this part
// app.get('*', (req, res) => {
//
// });
app.use(globalErrorHandler);

module.exports = app;
