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
})

// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   const restaurant = restaurantList.results.find(index => index.id.toString() === id)
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return (restaurant.name.toLowerCase().includes(keyword) ||
//       restaurant.category.toLowerCase().includes(keyword))
//   })
//   res.render('index', { restaurants: restaurants })
// })

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})




