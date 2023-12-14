// // public/js/addComment.js

// console.log("ok");

// const commentsContainer = document.getElementById("comments-container");
// const commentForm = document.getElementById("comment-form");

// let allUrl = window.location.href;
// let result = window.location.href.split("/").reverse()[0];

// loadComments(result);

// commentForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const author = this.querySelector("input[name='author']").value;
//   const blog = this.querySelector("input[name='blog']").value;
//   const text = this.querySelector("input[name='text']").value;

//   axios
//     .post("/addComment", { author, blog, text })
//     .then((response) => {
//       if (response.data.success) {
//         // Очистите поле ввода комментария
//         this.querySelector("input[name='text']").value = "";
//         // Загрузите комментарии после добавления
//         location.reload();
//       } else {
//         console.error(
//           "Ошибка при добавлении комментария:",
//           response.data.message
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("Ошибка при отправке комментария:", error);
//     });
// });

// // Функция для загрузки комментариев
// function loadComments(blogId) {
//   axios
//     .get(`/getComments/${blogId}`)
//     .then((response) => {
//       if (response.data.success) {
//         const comments = response.data.comments;
//         // Очистите контейнер комментариев
//         commentsContainer.innerHTML = "";
//         comments.forEach((comment) => {
//           // Создайте элементы комментариев и добавьте их в контейнер
//           const commentDiv = document.createElement("div");
//           commentDiv.classList.add("blog_comments");
//           commentDiv.innerHTML = `
//                         <div class="profile_info_com">
//                             <div>
//                                 <img src="/img/avatar1.jpg" alt="">
//                             </div>
//                             <h3>${
//                               comment.author
//                                 ? comment.author.full_name
//                                 : "Аноним"
//                             }</h3>
//                             <!-- Вставьте изображение и другую информацию о комментарии здесь -->
//                         </div>
//                         <p>${comment.text}</p>
//                     `;
//           commentsContainer.appendChild(commentDiv);
//         });
//       } else {
//         console.error(
//           "Ошибка при загрузке комментариев:",
//           response.data.message
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("Ошибка при загрузке комментариев:", error);
//     });
// }
// document.addEventListener('DOMContentLoaded', function() {
//     const blogId = blog._id ; // Замените на фактический идентификатор блога
//     loadComments(blogId);
// });

const blogId = window.location.pathname.split('/').pop();

  // Запросите комментарии с сервера с использованием Axios
  axios.get(`http://localhost:3000/getComments/${blogId}`)
    .then(response => {
      const data = response.data;
      const commentsContainer = document.getElementById('comments-container');

      if (data.success) {
        if (data.comments.length > 0) {
          data.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p>${comment.author.full_name || 'Аноним'}</p><p>${comment.text}</p>`;
            commentsContainer.appendChild(commentElement);
          });
        } else {
          commentsContainer.innerHTML = '<p>Нет комментариев</p>';
        }
      } else {
        console.error('Ошибка при получении комментариев:', data.message);
      }
    })
    .catch(error => console.error('Ошибка при выполнении запроса:', error));