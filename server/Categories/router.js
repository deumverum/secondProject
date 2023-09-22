const express = require('express')
const router = express.Router()
const {getAllCategories} = require('./controller')

const Categories = require('./Categories')

const writeDatacategory = require('./seed')

router.get('/api/category' , getAllCategories)

writeDatacategory()

module.exports = router