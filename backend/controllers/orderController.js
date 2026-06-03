// backend/controllers/orderController.js
const Order = require('../models/Order')

// Create new order (logged-in user)
exports.create = async (req, res) => {
  try {
    const { items, total, shippingAddress, paymentMethod } = req.body
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      shippingAddress,
      paymentMethod,
    })
    res.status(201).json(order)
  } catch (e) { res.status(400).json({ message: e.message }) }
}

// Get logged-in user's own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.car', 'name model year image price')
      .sort('-createdAt')
    res.json(orders)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

// Admin: get all orders with filters + pagination
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const q = {}
    if (status) q.status = status
    const [orders, total] = await Promise.all([
      Order.find(q)
        .populate('user', 'name email')
        .populate('items.car', 'name model year image')
        .sort('-createdAt')
        .skip((+page - 1) * +limit)
        .limit(+limit),
      Order.countDocuments(q),
    ])
    res.json({ orders, total, page: +page, totalPages: Math.ceil(total / +limit) })
  } catch (e) { res.status(500).json({ message: e.message }) }
}

// Admin: update order status
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (e) { res.status(400).json({ message: e.message }) }
}

// Admin: delete order
exports.remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ message: 'Deleted' })
  } catch (e) { res.status(500).json({ message: e.message }) }
}
