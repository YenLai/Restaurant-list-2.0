const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:sorting/:order', (req, res) => {
  const userId = req.user._id
  const sorting = req.params.sorting
  const order = req.params.order
  Restaurant.find({ userId })
    .lean()
    .sort({ [sorting]: [order] })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


module.exports = router