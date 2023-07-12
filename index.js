const express = require('express');
const mongoose = require('mongoose');
const password = "xkSgKV0Xya3Zjiwx";
const Attachment = require('./models/Attachment.js');
const Category = require('./models/Category.js');
const Chat = require('./models/Chat.js');
const Message = require('./models/Message.js');
const Post = require('./models/Post.js');
const User = require('./models/User.js');

const mongoDB = `mongodb+srv://yukh414:${password}@cluster0.glvsu2c.mongodb.net/`
mongoose.connect(mongoDB);

const app = express();
// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// if not in production use the port 5000
const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);