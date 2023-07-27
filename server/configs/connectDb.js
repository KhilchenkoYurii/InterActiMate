const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const Category = require('../models/categoryModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASSWORD);

const connectDb = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultUsers.json`, 'utf8'),
);
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultPosts.json`, 'utf8'),
);
const chats = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultChats.json`, 'utf8'),
);
const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultMessages.json`, 'utf8'),
);
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/defaultCategories.json`, 'utf8'),
);

//IMPORT DATA IN DATABASE
//command in Terminal
// $env:DATAPROCESS="IMPORT"
// nmp start
// after that need to change DATAPROCESS to another value because it will try to IMPORT every npm start
const importData = async () => {
  try {
    await User.create(users);
    await Post.create(posts);
    await Chat.create(chats);
    await Message.create(messages);
    await Category.create(categories);
    console.log('Data Imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DATA FROM DATABASE
//command in Terminal
// $env:DATAPROCESS="DELETE"
// nmp start
// after that need to change DATAPROCESS to another value because it will try to DELETE every npm start
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Chat.deleteMany();
    await Message.deleteMany();
    await Category.deleteMany();
    console.log('Data Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.env.DATAPROCESS === 'IMPORT') {
  importData();
} else if (process.env.DATAPROCESS === 'DELETE') {
  deleteData();
}

module.exports = connectDb;
