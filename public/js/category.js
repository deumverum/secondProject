const categoryInput = document.getElementById('category-input');
const categoryList = document.querySelector('.category-list');
const dropdownIcon = document.getElementById('category-dropdown-icon');

dropdownIcon.addEventListener('click', function() {
    if (categoryList.style.display === 'block') {
        categoryList.style.display = 'none';
    } else {
        categoryList.style.display = 'block';
    }
});

categoryList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        categoryInput.value = e.target.textContent;
        categoryList.style.display = 'none';
    }
});
