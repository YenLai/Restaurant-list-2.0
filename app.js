const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//tell express where to get static files
app.use(express.static('public'))

//tell express to use express-handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//tell express to use the handlebars as the view engine
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})




