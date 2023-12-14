// controllers/commentController.js
const Comment = require('./Commentaries');

exports.addComment = async (req, res) => {
    console.log(req.body);
    console.log('work');
    try {
        const { text, author, blog } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ success: false, message: 'Текст комментария не может быть пустым' });
        }
        
        const newComment = new Comment({
            text,
            author,
            blog,
        });

        const savedComment = await newComment.save();

        res.status(201).json({ success: true, message: 'Комментарий успешно добавлен', comment: savedComment });
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении комментария' });
    }
};


exports.getComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;

        console.log('Requested Blog ID:', blogId);
        
        const comments = await Comment.find({ blog: blogId }).populate('author');

        res.json({ success: true, comments: comments });
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        res.status(500).json({ success: false, message: 'Произошла ошибка при получении комментариев', error: error.message });
    }
};


// exports.loadComments = async (req, res) => {
//     try {
//         const blogId = req.params.blogId;

//         const comments = await Comment.find({ blog: blogId }).populate('author');

//         res.json({ success: true, comments: comments });
//     } catch (error) {
//         console.error('Ошибка при загрузке комментариев:', error);
//         res.status(500).json({ success: false, message: 'Произошла ошибка при загрузке комментариев' });
//     }
// };
