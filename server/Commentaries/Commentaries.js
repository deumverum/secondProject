// models/Comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
    },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);

