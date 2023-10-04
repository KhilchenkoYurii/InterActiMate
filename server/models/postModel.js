const moongoose = require('mongoose');

const { Schema } = moongoose;

const postSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
    unique: false,
  },
  body: {
    type: String,
    required: true,
    unique: false,
    default: '',
  },
  attachments: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  participators: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  categories: {
    type: Array,
    required: true,
    unique: false,
  },
  dateOfCreation: {
    type: Date,
    required: true,
    unique: false,
  },
  status: {
    type: String,
    required: true,
    unique: false,
    default: 'Active',
  },
});

// postSchema.pre('find', async function (next) {
//   this.find({ status: 'Active' });
//   next();
// });

module.exports = moongoose.model('Post', postSchema);
