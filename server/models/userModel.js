const moongoose = require('mongoose');

const { Schema } = moongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: false,
    default: 'John',
  },
  surname: {
    type: String,
    required: false,
    unique: false,
    default: 'Doe',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: false,
    default: 'User',
  },
  bio: {
    type: String,
    required: false,
    unique: false,
    default: '',
  },
  createdPosts: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  answeredPosts: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  chats: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  password: {
    type: String,
    required: true,
    unique: false,
    select: false,
  },
  status: {
    type: String,
    required: true,
    unique: false,
    default: 'Active',
  },
  showOnlyNickname: {
    type: Boolean,
    required: true,
    unique: false,
    default: false,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
    default: '',
  },
  favoritePosts: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
});
module.exports = moongoose.model('User', userSchema);
