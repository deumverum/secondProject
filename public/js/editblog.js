document.addEventListener('DOMContentLoaded', function() {
    const editBlogBtns = document.querySelectorAll('.edit_blog_btn');

    editBlogBtns.forEach(function(editBlogBtn) {
        editBlogBtn.addEventListener('click', function() {
            const menuOptions = editBlogBtn.nextElementSibling;
            menuOptions.style.display = (menuOptions.style.display === 'none') ? 'block' : 'none';
        });
    });
});
