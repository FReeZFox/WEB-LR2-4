const Router = require('express')
const router = new Router()
const PublisherController = require('../controllers/PublisherController')
const CheckRole = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRole('ADMIN'), PublisherController.create)
router.get('/', PublisherController.getAll)
router.delete('/:id', PublisherController.delete)

module.exports = router