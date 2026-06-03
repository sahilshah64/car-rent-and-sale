// backend/server.js
const express  = require('express')
const cors     = require('cors')
require('dotenv').config()

const connectDB    = require('./config/db')
const authRoutes   = require('./routes/authRoutes')
const carRoutes    = require('./routes/carRoutes')
const orderRoutes  = require('./routes/orderRoutes')
const blogRoutes   = require('./routes/blogRoutes')
const userRoutes   = require('./routes/userRoutes')

const app = express()

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }))
app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes)
app.use('/api/cars',   carRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/blogs',  blogRoutes)
app.use('/api/users',  userRoutes)

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'Server is running ✅' }))

// 404
app.use((_, res) => res.status(404).json({ message: 'Route not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

// ── Start ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
})
