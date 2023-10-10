const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User');
const Blog = require('../Blogs/blog');


router.get('/programmingblog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('programming_blog.ejs', { pageName: 'programming_blog', Categories: allCategories , user: req.user ? req.user : {}});
});

router.get('/login', (req, res) => {
    const { message } = req.query;
    res.render('login.ejs', { pageName: 'login', message , user: req.user ? req.user : {} });
});

router.get('/register', (req, res) => {
    const { message, error, details } = req.query;
    res.render('register.ejs', { pageName: 'register', message, error, details , user: req.user ? req.user : {} });
});


router.get('/myblogs/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const allCategories = await Categories.find()
        const blogs = await Blog.find({ author: user.id }).sort({ created_at: -1 });
        res.render('my_blogs.ejs', { pageName: 'my_blogs', user: user, loginUser: req.user, blogs: blogs , author: user.id});
    } else {
        res.redirect('/not-found');
    }
});


router.get('/addnewblog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('add_newblog.ejs', { pageName: 'add_newblog' , user: req.user ? req.user : {}});
});

router.get('/editblog/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit_blog.ejs', { pageName: 'edit_blog', user: req.user ? req.user : {}, blogs: blogs, author: req.params.id });
});

router.get('/serf', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('serf.ejs', { pageName: 'serf' , Categories: allCategories , user: req.user ? req.user : {}});
});

router.get('/not-found' , (req , res) => {
    res.render('notfound')
})

module.exports = router