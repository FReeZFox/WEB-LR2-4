const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController') 
const AuthMiddleware = require('../middleware/AuthMiddleware') 

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', AuthMiddleware, UserController.check)

module.exports = router