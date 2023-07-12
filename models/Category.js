const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const categorySchema = new Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = moongoose.model('Category', categorySchema);