const moongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    unique: false,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    required: true,
    unique: false,
    default: 'User',
    select: false,
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
    select: false,
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
  passwordChangedAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  passwordResetToken: String,
  passwordResetExpired: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; //i
  next();
});

userSchema.pre(/^find/, async function (next) {
  this.find({ status: { $ne: 'Deactivated' } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = moongoose.model('User', userSchema);
