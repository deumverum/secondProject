const express = require('express')
const router = express.Router();

router.get('/' , (req ,res) => {
    res.render('programming_blog.ejs', { pageName: 'programming_blog' })
})
router.get('/programmingblog', (req, res) => {
    res.render('programming_blog.ejs', { pageName: 'programming_blog' });
});

router.get('/login', (req, res) => {
    res.render('login.ejs', { pageName: 'login' });
});


router.get('/register', (req, res) => {
    res.render('register.ejs', { pageName: 'register' });
});

router.get('/myblogs', (req, res) => {
    res.render('my_blogs.ejs', { pageName: 'my_blogs' });
});

router.get('/addnewblog', (req, res) => {
    res.render('add_newblog.ejs', { pageName: 'add_newblog' });
});

router.get('/profileserf', (req, res) => {
    res.render('profile_serf.ejs', { pageName: 'profile_serf' });
});

router.get('/guestserf', (req, res) => {
    res.render('guest_serf.ejs', { pageName: 'guest_serf' });
});

module.exports = router