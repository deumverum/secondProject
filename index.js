const express = require('express')
const app = express()
const port = 3000

require('./server/config/db')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(require('./server/pages/router'))
app.use(require('./server/Categories/router'))
const authRouter = require('./server/auth/router');
app.use(authRouter);


app.listen(3000, () => {
    console.log(`server work on port ${port}`);
})