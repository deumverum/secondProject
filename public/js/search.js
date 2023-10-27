// Находим кнопку "Найти" по её классу
const searchButton = document.querySelector('.search_button');

// Находим форму по её id
const searchForm = document.getElementById('blogSearchForm');

if (searchButton && searchForm) {
    searchButton.addEventListener('click', function () {
        // Находим поле поиска по его id
        const searchInput = document.getElementById('blogSearch');

        // Получаем значение из поля поиска
        const searchQuery = searchInput.value;

        // Формируем URL для отправки
        const url = '/programmingblog?search=' + encodeURIComponent(searchQuery);

        // Переходим по этому URL
        window.location.href = url;
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchInput = document.getElementById('blogSearch');
        const searchQuery = searchInput.value;
        const url = '/programmingblog?search=' + encodeURIComponent(searchQuery);
        window.location.href = url;
    });
}


