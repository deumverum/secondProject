// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('./controller');

router.post('/addComment', commentController.addComment);
router.get('/getComments/:blogId', commentController.getComments);
// router.get('/loadComments/:blogId', commentController.loadComments);

module.exports = router;
