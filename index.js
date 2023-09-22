const express = require('express')
const app = express()

require('./server/config/db')

const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(require('./server/pages/router'))
app.use(require('./server/Categories/router'))

app.listen(3000, () => {
    console.log('server work on port 3000');
})