//router.js
const express = require('express')
const { signUp } = require('./controller')
const router = express.Router()

router.post('/api/signup' , signUp)

module.exports = router