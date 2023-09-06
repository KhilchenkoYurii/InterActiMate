const express = require('express');
//const path = require('path');
const cors = require('cors');

const userRouter = require('./server/routes/userRoutes');
const postRouter = require('./server/routes/postRoutes');
const chatRouter = require('./server/routes/chatRoutes');
const messageRouter = require('./server/routes/messageRoutes');
const categoryRouter = require('./server/routes/categoryRoutes');
const attachmentRouter = require('./server/routes/attachmentRoutes');
const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');

const app = express();
// serve up production assets

app.use(express.json());
app.use(express.static('client/build'));
app.use(cors({ origin: `http://localhost:${process.env.PORT || 3001}` }));
// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);
app.use('/categories', categoryRouter);
app.use('/attachments', attachmentRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// error handeling does not works with this part
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });
app.use(globalErrorHandler);

module.exports = app;
