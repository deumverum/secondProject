document.addEventListener('DOMContentLoaded', function() {
    const editBlogBtn = document.querySelector('.edit_blog_btn');
    const menuOptions = document.querySelector('.menu-options');

    editBlogBtn.addEventListener('click', function() {
        menuOptions.style.display = (menuOptions.style.display === 'none') ? 'block' : 'none';
    });
});