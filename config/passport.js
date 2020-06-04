const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {

  // initialize passport modules
  app.use(passport.initialize())
  app.use(passport.session())

  //set passport strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered!' })
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
      .catch(err => console.log(err))
  }
  ))

  //set serialize and deserialize
  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err))
  })
}





