const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 是否每個欄位都有填
  if (!name | !email | !password | !confirmPassword) {
    errors.push({ message: '每個欄位都是必填。' })
  }
  // 密碼與確認密碼是否相符
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  // email 是否重複
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '該 Email 已經被註冊過。' })
        // return res.render('register', { errors, name, email, password, confirmPassword })
      }
      if (errors.length)
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })

      // 註冊資料都無誤之後hash密碼，存入資料庫
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return User.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => {
          req.flash('success_msg', '帳號註冊成功!')
          res.redirect('/user/login')
        })
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/user/login')
})


module.exports = router