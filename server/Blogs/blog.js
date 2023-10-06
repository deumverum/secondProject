const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const BlogSchema = new mongoose.Schema({
    title: String,
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
    image: String,
    overview: String,
    author: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('blog', BlogSchema);
