const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.end('Welcome')
})

app.get('/programmingblog', (req, res) => {
    res.render('programming_blog.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(3000, () => {
    console.log('server work on port 3000');
})