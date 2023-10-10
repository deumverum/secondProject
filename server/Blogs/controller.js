//controller.js
const Blog = require('./blog');

const createBlog = async (req, res) => {
    try {
        if (req.body.title && req.body.overview) {
            const newBlogData = {
                title: req.body.title,
                overview: req.body.overview,
                author: req.user.id,
            };

            if (req.body.categoryId) {
                newBlogData.category = req.body.categoryId;
            }

            if (req.file && req.file.filename) {
                newBlogData.image = `/img/blogs/${req.file.filename}`;
            }

            const newBlog = new Blog(newBlogData);

            await newBlog.save();
            res.redirect(`/myblogs/${req.user._id}`);
        } else {
            res.redirect('/addnewblog?error=1');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/error');
    }
};

module.exports = {
    createBlog,
};