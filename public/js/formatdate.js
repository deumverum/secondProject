function formatdate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
}