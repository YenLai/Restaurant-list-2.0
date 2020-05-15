const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()
const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('method'))
app.use(routes)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen('3000', () => {
  console.log(`The server is listening on http://localhost:3000`)
})

