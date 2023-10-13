//controller.js
const Blog = require('./blog');
const fs = require('fs')
const path = require('path')

const createBlog = async (req, res) => {
    try {
        if (req.body.title && req.body.overview) {
            const newBlogData = {
                title: req.body.title,
                overview: req.body.overview,
                author: req.user.id,
            };

            if (req.body.category) {
                newBlogData.category = req.body.category;
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

const editBlog = async (req, res) => {
    if (req.body.title.length > 2 && req.body.overview.length > 0 && req.body.category.length > 0) {
        try {
            const blog = await Blog.findById(req.body.id);

            if (!blog) {
                return res.redirect(`/editblog/${req.body.id}?error=3`);
            }

            if (req.file) {
                blog.image = `/img/blogs/${req.file.filename}`;
            }

            blog.title = req.body.title;
            blog.overview = req.body.overview;
            blog.category = req.body.category;
            blog.author = req.user.id;

            const updatedBlog = await blog.save();

            if (updatedBlog) {
                return res.redirect(`/myblogs/${req.user.id}`);
            } else {
                return res.redirect(`/editblog/${req.body.id}?error=2`);
            }
        } catch (error) {
            console.error(error);
            return res.redirect(`/editblog/${req.body.id}?error=2`);
        }
    } else {
        return res.redirect(`/editblog/${req.body.id}?error=1`);
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);   

        if (!blog) {
            return res.redirect(`/myblogs/${req.params.authorId}?error=1`);
        }

        if (blog.image) {
            console.log(blog.image)
            const imagePath = path.join(__dirname + '../../../public' + blog.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                } else {
                    console.log('Файл успешно удален');
                }
            });
        }
        
         else {
            console.log('У блога нет изображения для удаления');
        }
        try {
            const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    
            if (deletedBlog) {
                // Успешное удаление блога
                return res.json({ success: true, userId: req.user.id });
            } else {
                // В случае, если блог не был найден
                return res.json({ success: false });
            }
        } catch (error) {
            console.error(error);
            // В случае ошибки при запросе к базе данных
            return res.json({ success: false });
        }

    } catch (error) {
        console.error(error);
        return res.redirect(`/myblogs/${req.params.authorId}?error=2`);
    }
};



module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
};