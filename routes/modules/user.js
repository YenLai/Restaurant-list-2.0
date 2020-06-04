const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

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

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})




module.exports = router