// backend/controllers/userController.js
const User = require('../models/User')

// Admin: get all users
exports.getAll = async (req, res) => {
  try {
    const { search } = req.query
    const q = {}
    if (search) {
      q.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }
    const [users, total] = await Promise.all([
      User.find(q).select('-password').sort('-createdAt'),
      User.countDocuments(q),
    ])
    res.json({ users, total })
  } catch (e) { res.status(500).json({ message: e.message }) }
}

// Admin: change user role
exports.updateRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (e) { res.status(400).json({ message: e.message }) }
}

// Admin: delete user
exports.remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted' })
  } catch (e) { res.status(500).json({ message: e.message }) }
}
