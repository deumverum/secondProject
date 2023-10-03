const express = require('express')
const app = express()
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')
const port = 3000

require('./server/config/db')
require('./server/config/passport')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'decode.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    saveUninitialized: true,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    })
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')
app.use(require('./server/pages/router'))
app.use(require('./server/Categories/router'))
const authRouter = require('./server/auth/router');
app.use(authRouter);


app.listen(3000, () => {
    console.log(`server work on port ${port}`);
})