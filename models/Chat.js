const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const chatSchema = new Schema({
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true,
        unique: false
    },
    chatUsers:{
        type: Array,
        required: true,
        unique: false
    }
});
export default moongoose.model('Chat', chatSchema);