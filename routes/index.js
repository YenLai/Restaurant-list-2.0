const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const sort = require('./modules/sort')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/', authenticator, home)
router.use('/restaurant', authenticator, restaurants)
router.use('/sort', authenticator, sort)
router.use('/search', authenticator, search)

module.exports = router