const Router = require('express')
const router = new Router()
const BookRoute = require('./BookRoute')
const UserRoute = require('./UserRoute')
const PublisherRoute = require('./PublisherRoute')
const GenreRoute = require('./GenreRoute')
const CartRoute = require('./CartRoute')
const PurchasesRoute = require('./PurchasesRoute')

router.use('/user', UserRoute)
router.use('/genre', GenreRoute)
router.use('/publisher', PublisherRoute)
router.use('/book', BookRoute)
router.use('/cart', CartRoute)
router.use('/purchases', PurchasesRoute)

module.exports = router