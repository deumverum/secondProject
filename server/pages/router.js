const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')


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


router.get('/myblogs/:id', (req, res) => {
    res.render('my_blogs.ejs', { pageName: 'my_blogs' , user: req.user ? req.user : {}});
});

router.get('/addnewblog', (req, res) => {
    res.render('add_newblog.ejs', { pageName: 'add_newblog' , user: req.user ? req.user : {}});
});

router.get('/profileserf', (req, res) => {
    res.render('profile_serf.ejs', { pageName: 'profile_serf' , user: req.user ? req.user : {}});
});

router.get('/guestserf', (req, res) => {
    res.render('guest_serf.ejs', { pageName: 'guest_serf' , user: req.user ? req.user : {}});
});

module.exports = router