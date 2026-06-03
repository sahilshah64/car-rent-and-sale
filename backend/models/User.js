// backend/models/User.js
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const schema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ['user','admin'], default: 'user' },
}, { timestamps: true })

schema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

schema.methods.matchPassword = function(pwd) {
  return bcrypt.compare(pwd, this.password)
}

module.exports = mongoose.model('User', schema)
