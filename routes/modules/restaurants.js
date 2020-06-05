const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/create', (req, res) => {
  res.render('create')
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const detail = true
  Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('detail', { restaurant, detail }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const del = true
  Restaurant.findOne({ userId, _id })
    .lean()
    .then((restaurant => res.render('detail', { restaurant, del })))
    .catch(error => console.log(error))
})

router.post('/create', (req, res) => {
  const userId = req.user._id
  const { name, category, image, location, phone, description, rating } = req.body
  return Restaurant.create({
    name, category, image, location, phone, description, rating, userId,
    google_map: `https://www.google.com/maps/search/?api=1&query=${location}`
  })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body
  return Restaurant.findOne({ userId, _id })
    .then((restaurant) => {
      restaurant.name = body.name
      restaurant.category = body.category
      restaurant.location = body.location
      restaurant.google_map = `https://www.google.com/maps/search/?api=1&query=${body.location}`
      restaurant.phone = body.phone
      restaurant.description = body.description
      restaurant.rating = body.rating
      restaurant.image = body.image
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router