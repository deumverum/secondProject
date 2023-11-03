// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    re_password: String,
    githubId : String,
});

const User = mongoose.model('User', userSchema);



module.exports = User;

