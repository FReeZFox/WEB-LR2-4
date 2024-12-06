const Router = require('express');
const router = new Router();
const PurchasesController = require('../controllers/PurchasesController')
const AuthMiddleware = require('../middleware/AuthMiddleware') 

router.get('/', AuthMiddleware, PurchasesController.fetchPurchases)

module.exports = router;
