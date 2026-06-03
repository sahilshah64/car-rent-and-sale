// backend/routes/orderRoutes.js
const router = require('express').Router()
const c = require('../controllers/orderController')
const { protect, adminOnly } = require('../middleware/auth')

// User routes
router.post('/',          protect, c.create)         // Place order
router.get('/myorders',   protect, c.getMyOrders)    // My order history

// Admin routes
router.get('/',               protect, adminOnly, c.getAll)
router.put('/:id/status',     protect, adminOnly, c.updateStatus)
router.delete('/:id',         protect, adminOnly, c.remove)

module.exports = router
