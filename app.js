const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('method'))
usePassport(app)
app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.listen('3000', () => {
  console.log(`The server is listening on http://localhost:3000`)
})

