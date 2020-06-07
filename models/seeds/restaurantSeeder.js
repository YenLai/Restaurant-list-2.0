const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      return Promise.all(Array.from(
        { length: restaurantList.results.length },
        (_, i) => Restaurant.create({
          name: restaurantList.results[i].name,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          description: restaurantList.results[i].description,
          rating: restaurantList.results[i].rating,
          userId: userId
        })
      ))

    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})

