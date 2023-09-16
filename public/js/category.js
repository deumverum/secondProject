// Определяем элементы
const categoryInput = document.getElementById('category-input');
const categoryList = document.querySelector('.category-list');
const dropdownIcon = document.getElementById('category-dropdown-icon');

// Показываем/скрываем список при клике на стрелочку
dropdownIcon.addEventListener('click', function() {
    if (categoryList.style.display === 'block') {
        categoryList.style.display = 'none';
    } else {
        categoryList.style.display = 'block';
    }
});

// Заполняем инпут категории при выборе
categoryList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        categoryInput.value = e.target.textContent;
        categoryList.style.display = 'none';
    }
});
