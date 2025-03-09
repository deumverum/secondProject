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