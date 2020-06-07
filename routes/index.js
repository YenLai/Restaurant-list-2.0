const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const sort = require('./modules/sort')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/user', user)
router.use('/restaurant', authenticator, restaurants)
router.use('/sort', authenticator, sort)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

module.exports = router