const Categories = require('./Categories');
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интеллект',
    'Машинное обучение',
    'Алгоритмы',
    'Тестирование IT систем'
];

async function writeDataCategory() {
    const length = await Categories.countDocuments();

    if (length === 0) {
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            await new Categories({
                name: item,
                key: index
            }).save();
        }
        console.log('Данные сохранены в базу данных.');
    } else {
        console.log('Данные уже существуют в базе данных. Ничего не сохранено.');
    }
}

module.exports = writeDataCategory;

