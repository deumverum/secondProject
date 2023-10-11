//router.js
const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const { createBlog } = require('./controller');
const { isAuth } = require('../auth/middlewares');
const { editBlog } = require('./controller');
const { deleteBlog } = require('./controller');

router.post('/api/blogs/new', isAuth , upload.single('image'), createBlog );
router.post('/api/blogs/edit', isAuth , upload.single('image'), editBlog );
router.delete('/api/blogs/delete/:id', isAuth, deleteBlog);

module.exports = router;
