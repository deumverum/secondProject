// public/js/addComment.js

console.log('ok');

const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const author = this.querySelector("input[name='author']").value;
    const blog = this.querySelector("input[name='blog']").value;
    const text = this.querySelector("input[name='text']").value;

    axios.post('/addComment', { author, blog, text })
    .then(response => {
        if (response.data.success) {
            // Очистите поле ввода комментария
            this.querySelector("input[name='text']").value = '';
            // Загрузите комментарии после добавления
            loadComments(blog);
        } else {
            console.error('Ошибка при добавлении комментария:', response.data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке комментария:', error);
    });
});

// Функция для загрузки комментариев
function loadComments(blogId) {
    axios.get(`/getComments/${blogId}`)
        .then(response => {
            if (response.data.success) {
                const comments = response.data.comments;
                // Очистите контейнер комментариев
                commentsContainer.innerHTML = '';
                comments.forEach(comment => {
                    // Создайте элементы комментариев и добавьте их в контейнер
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('blog_comments');
                    commentDiv.innerHTML = `
                        <div class="profile_info_com">
                            <img src="/img/avatar1.jpg" alt="">
                            <h3>${comment.author ? comment.author.full_name : 'Аноним'}</h3>
                            <!-- Вставьте изображение и другую информацию о комментарии здесь -->
                        </div>
                        <p>${comment.text}</p>
                    `;
                    commentsContainer.appendChild(commentDiv);
                });
            } else {
                console.error('Ошибка при загрузке комментариев:', response.data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке комментариев:', error);
        });
}
// document.addEventListener('DOMContentLoaded', function() {
//     const blogId = blog._id ; // Замените на фактический идентификатор блога
//     loadComments(blogId);
// });

