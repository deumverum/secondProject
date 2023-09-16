const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.end('Welcome')
})

app.get('/programmingblog', (req, res) => {
    res.render('programming_blog.ejs', { pageName: 'programming_blog' });
});

app.get('/login', (req, res) => {
    res.render('login.ejs', { pageName: 'login' });
});


app.get('/register', (req, res) => {
    res.render('register.ejs', { pageName: 'register' });
});

app.get('/myblogs', (req, res) => {
    res.render('my_blogs.ejs', { pageName: 'my_blogs' });
});

app.get('/addnewblog', (req, res) => {
    res.render('add_newblog.ejs', { pageName: 'add_newblog' });
});

  

app.listen(3000, () => {
    console.log('server work on port 3000');
})