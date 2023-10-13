function deleteBlog(blogId, authorId) {
    if (confirm('Вы уверены, что хотите удалить этот блог?')) {
        axios
            .delete(`/deleteblog/${blogId}/${authorId}`)
            .then((response) => {
                if (response.data.success) {
                    alert('Блог успешно удален');
                    location.replace(`/myblogs/${authorId}`);
                } else {
                    alert('Не удалось удалить блог');
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.error('Ошибка при удалении блога:', error);
                alert('Произошла ошибка при удалении блога');
            });
    }
}

