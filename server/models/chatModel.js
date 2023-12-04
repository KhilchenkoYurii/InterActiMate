const moongoose = require('mongoose');

const { Schema } = moongoose;

const chatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {
    type: String,
    required: true,
    unique: false,
  },
  chatUsers: {
    type: Array,
    required: true,
    unique: false,
  },
  relatedPost: {
    type: Object,
    require: false,
    unique: false,
  },
  status: {
    type: String,
    required: true,
    unique: false,
    default: 'Active',
    enum: ['Active', 'Archived'],
  },
});
module.exports = moongoose.model('Chat', chatSchema);
