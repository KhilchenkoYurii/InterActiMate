const express = require('express');
const path = require('path');

const userRouter = require('./server/routes/userRoutes');
const postRouter = require('./server/routes/postRoutes');
const chatRouter = require('./server/routes/chatRoutes');
const messageRouter = require('./server/routes/messageRoutes');
const categoryRouter = require('./server/routes/categoryRoutes');

const app = express();
// serve up production assets

app.use(express.json());
app.use(express.static('client/build'));
// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);
app.use('/categories', categoryRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
