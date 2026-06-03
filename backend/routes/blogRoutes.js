// backend/routes/blogRoutes.js
const router = require('express').Router()
const c = require('../controllers/blogController')
const { protect, adminOnly } = require('../middleware/auth')

router.get('/',     c.getAll)                         // Public
router.get('/:id',  c.getOne)                         // Public
router.post('/',    protect, adminOnly, c.create)
router.put('/:id',  protect, adminOnly, c.update)
router.delete('/:id', protect, adminOnly, c.remove)

module.exports = router
