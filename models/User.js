const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: false,
        unique: false
    },
    surname:{
        type: String,
        required: false,
        unique: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: false,
        unique: true
    },
    role:{
        type: String,
        required: true,
        unique: false
    },
    bio:{
        type: String,
        required: false,
        unique: false
    },
    createdPosts:{
        type: Array,
        required: false,
        unique: false
    },
    answeredPosts:{
        type: Array,
        required: false,
        unique: false
    },
    chats:{
        type: Array,
        required: false,
        unique: false
    },
    password:{
        type: String,
        required: true,
        unique: false
    },
    status:{
        type: String,
        required: true,
        unique: false
    },
    showOnlyNickname:{
        type: Boolean,
        required: true,
        unique: false
    },
    avatar:{
        type: String,
        required: false,
        unique: false
    },
    favoritePosts:{
        type: Array,
        required: false,
        unique: false
    }
});
export default moongoose.model('User', userSchema);