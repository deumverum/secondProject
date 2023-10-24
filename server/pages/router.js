const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User');
const Blog = require('../Blogs/blog');
const moment = require('moment');


router.get('/programmingblog', async (req, res) => {
    const allCategories = await Categories.find();

    const catId = req.query.catId;

    let blogs;
    if (catId) {
        blogs = await Blog.find({ category: catId })
            .populate('category')
            .populate('author')
            .sort({ created_at: -1 });
    } else {
        blogs = await Blog.find()
            .populate('category')
            .populate('author')
            .sort({ created_at: -1 });
    }

    const blogCount = blogs.length;
    const blogViews = {};
    for (const blog of blogs) {
        blogViews[blog._id] = blog.views;
    }

    for (const blog of blogs) {
        blog.views += 1;
        await blog.save();
    }

    res.render('programming_blog.ejs', {
        pageName: 'programming_blog',
        user: req.user || {},
        loginUser: req.user || {},
        blogs: blogs,
        Categories: allCategories,
        blogViews: blogViews,
        blogCount: blogCount,
        catId: catId
    });
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
    const allCategories = await Categories.find();
    const user = await User.findById(req.params.id);

    if (req.user) {
        user.full_name = req.user.full_name;
    }

    if (user) {
        const blogs = await Blog.find({ author: user.id })
            .populate('category')
            .populate('author')
            .sort({ created_at: -1 });
        
        const blogCount = blogs.length;
        const blogViews = {};
        for (const blog of blogs) {
            blogViews[blog._id] = blog.views;
        }

        for (const blog of blogs) {
            blog.views += 1;
            await blog.save();
        }

        res.render('my_blogs.ejs', {
            pageName: 'my_blogs',
            user: user,
            loginUser: req.user,
            blogs: blogs,
            author: user.id,
            Categories: allCategories,
            blogViews: blogViews,
            blogCount: blogCount
        });
    } else {
        res.redirect('/not-found');
    }
});


router.get('/addnewblog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('add_newblog.ejs', { pageName: 'add_newblog' , user: req.user ? req.user : {}, categories: allCategories});
});

router.get('/editblog/:id', async(req, res) => {
    const allCategories = await Categories.find();
    const blog = await Blog.findById(req.params.id);
    res.render('edit_blog.ejs', { pageName: 'edit_blog', user: req.user ? req.user : {}, blog: blog, categories: allCategories });    
});

router.get('/blog_details/:id', async (req, res) => {
    const allCategories = await Categories.find();
    const blog = await Blog.findById(req.params.id)
        .populate('category')
        .populate('author');

    if (!blog) {
        return res.status(404).send('Блог не найден');
    }

    const blogViews = blog.views + 1; 

    await Blog.findByIdAndUpdate(req.params.id, { views: blogViews }); 
    res.render('blog_details.ejs', {
        user: req.user || {},
        loginUser: req.user || {},
        blog: blog,
        Categories: allCategories,
        blogViews: blogViews,
    });
});


router.get('/not-found' , (req , res) => {
    res.render('notfound')
})

module.exports = router