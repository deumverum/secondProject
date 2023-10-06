// middlewares.js
const isAuth = (req, res, next) => {
    // Ваша логика аутентификации
    if (req.isAuthenticated()) {
        return next(); // Пользователь аутентифицирован, продолжаем выполнение запроса
    } else {
        res.redirect('/login'); // Пользователь не аутентифицирован, перенаправляем на страницу входа
    }
};

module.exports = { isAuth };
