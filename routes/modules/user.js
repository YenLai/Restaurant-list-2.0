const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  User.create({
    name, email, password
  })
    .then(() => res.redirect('/user/login'))
    .catch(err => console.log(err))
})


module.exports = router