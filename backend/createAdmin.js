// backend/createAdmin.js
// ─────────────────────────────────────────────────────────────────────────────
// Run this script ONCE to create your first admin account:
//   node createAdmin.js
//
// Then log in at http://localhost:3000/login with these credentials
// and you'll automatically be redirected to /admin
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config()
const mongoose = require('mongoose')
const User     = require('./models/User')

// ── CHANGE THESE before running ──────────────────────────────────────────────
const ADMIN_NAME     = 'Admin'
const ADMIN_EMAIL    = 'admin@zoomcar.com'
const ADMIN_PASSWORD = 'admin123'        // Change this!
// ─────────────────────────────────────────────────────────────────────────────

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ Connected to MongoDB')

  const existing = await User.findOne({ email: ADMIN_EMAIL })
  if (existing) {
    // If user exists but isn't admin, upgrade them
    if (existing.role !== 'admin') {
      existing.role = 'admin'
      await existing.save()
      console.log(`✅ Upgraded "${ADMIN_EMAIL}" to admin`)
    } else {
      console.log(`ℹ️  Admin "${ADMIN_EMAIL}" already exists`)
    }
  } else {
    // Create brand new admin user
    await User.create({
      name:     ADMIN_NAME,
      email:    ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role:     'admin',
    })
    console.log(`✅ Admin created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  }

  console.log('\n🎉 Done! Log in at http://localhost:3000/login')
  await mongoose.connection.close()
}

createAdmin().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
