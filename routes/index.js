const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const sort = require('./modules/sort')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const user = require('./modules/user')

router.use('/user', user)
router.use('/', home)
router.use('/restaurant', restaurants)
router.use('/sort', sort)
router.use('/search', search)

module.exports = router