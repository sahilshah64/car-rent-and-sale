// backend/controllers/authController.js
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
const fmt  = (u, token) => ({ _id: u._id, name: u.name, email: u.email, role: u.role, token })

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' })
    const user = await User.create({ name, email, password })
    res.status(201).json(fmt(user, sign(user._id)))
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' })
    res.json(fmt(user, sign(user._id)))
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.getMe = (req, res) => res.json(req.user)
