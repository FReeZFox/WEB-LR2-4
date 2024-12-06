const Router = require('express')
const router = new Router()
const GenreController = require('../controllers/GenreController')
const CheckRole = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRole('ADMIN'), GenreController.create)
router.get('/', GenreController.getAll)
router.delete('/:id', GenreController.delete)

module.exports = router