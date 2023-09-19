const moongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: [validator.isEmail, 'Please, tell your correct email'],
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
    required: [true, 'Please, write your password'],
    minlength: 8,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; //i
  next();
});

module.exports = moongoose.model('User', userSchema);
