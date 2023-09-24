// controller.js
const User = require('./User');
const bcrypt = require('bcrypt');

// Контроллер для обработки GET-запроса на страницу "/register"
const getRegisterPage = (req, res) => {
    const { message, error, details } = req.query;
    res.render('register.ejs', { pageName: 'register', message, error, details });
};

// Контроллер для обработки POST-запроса на регистрацию
const signUp = async (req, res) => {
    try {
        const { email, full_name, password, re_password } = req.body;

        // Проверка на соответствие паролей
        if (password !== re_password) {
            const details = 'Попробуйте внимательно ввести пароль заново';
            return res.redirect(`/register?error=Пароли не совпадают&details=${encodeURIComponent(details)}`);
        }

        // Проверка, существует ли пользователь с таким же email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const details = 'Попробуйте использовать другой e-mail';
            return res.redirect(`/register?error=Пользователь с таким email уже существует&details=${encodeURIComponent(details)}`);
        }

        // Хеширование пароля
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const user = new User({ email, full_name, password: hash });

        // Сохранение пользователя в базе данных
        await user.save();

        // Отправка успешного ответа
        return res.redirect('/register?message=Регистрация успешна');
    } catch (error) {
        // Обработка других ошибок
        const details = 'Попробуйте заново';
        return res.redirect(`/register?error=Произошла ошибка при регистрации&details=${encodeURIComponent(details)}`);
    }
};

module.exports = { getRegisterPage, signUp };
