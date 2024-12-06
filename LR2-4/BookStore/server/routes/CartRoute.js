const Router = require('express')
const router = new Router()
const CartController = require('../controllers/CartController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get('/', AuthMiddleware , CartController.getCartUser)
router.post('/', AuthMiddleware , CartController.addToCart)
router.delete('/:id', CartController.deleteFromCart)
router.post('/purchase', AuthMiddleware, CartController.purchaseCart)
 
module.exports = router
