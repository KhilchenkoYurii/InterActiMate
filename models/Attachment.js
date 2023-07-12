const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const attachmentSchema = new Schema({
    attachmentId: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true,
        unique: false
    },
    ownerType:{
        type: String,
        required: true,
        unique: false
    },
    address:{
        type: String,
        required: true,
        unique: true
    }
});
module.exports = moongoose.model('Attachment', attachmentSchema);