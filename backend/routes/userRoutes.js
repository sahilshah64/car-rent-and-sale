// backend/routes/userRoutes.js
const router = require('express').Router()
const c = require('../controllers/userController')
const { protect, adminOnly } = require('../middleware/auth')

router.get('/',           protect, adminOnly, c.getAll)
router.put('/:id/role',   protect, adminOnly, c.updateRole)
router.delete('/:id',     protect, adminOnly, c.remove)

module.exports = router
