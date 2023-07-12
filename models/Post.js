const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const postSchema = new Schema({
    postId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
        unique: false
    },
    body:{
        type: String,
        required: true,
        unique: false
    },
    attachments:{
        type: Array,
        required: false,
        unique: false
    },
    participators:{
        type: Array,
        required: false,
        unique: false
    },
    title:{
        type: String,
        required: true,
        unique: false
    },
    categories:{
        type: Array,
        required: true,
        unique: false
    },
    dateOfCreation:{
        type: Date,
        required: true,
        unique: false
    },
    status:{
        type: String,
        required: true,
        unique: false
    }
});
export default moongoose.model('Post', postSchema);