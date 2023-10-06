//controller.js
const Blog = require('./blog');

const createBlog = (req , res) => {
    if(req.file && req.body.title.length > 2 && 
        req.body.title.length > 2 && 
        req.body.category.length > 2 && 
        req.body.overview.length > 2)
    {
        new Blog({
            title: req.body.title,
            category: req.body.categoryId,
            image: `/img/blogs/${req.file.filename}`,
            overview: req.body.overview,
            author: req.user.id,
        }).save()
        .then(() => {
            res.redirect(`/myblogs/${req.user._id}`);
        })
        .catch(err => {
            console.error(err);
            res.redirect('/error');
        });
    } else {
        res.redirect('/addnewblog?error=1');
    }
}

module.exports = {
    createBlog,
};