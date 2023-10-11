const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const BlogSchema = new mongoose.Schema({
    title: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    overview: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    views: {
        type: Number,
        default: 0
    },
    created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('blog', BlogSchema);
