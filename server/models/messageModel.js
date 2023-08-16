const moongoose = require('mongoose');

const { Schema } = moongoose;

const messageSchema = new Schema({
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  sender: {
    type: String,
    required: true,
    unique: false,
  },
  chatId: {
    type: String,
    required: true,
    unique: false,
  },
  body: {
    type: String,
    required: true,
    unique: false,
  },
});
module.exports = moongoose.model('Message', messageSchema);
