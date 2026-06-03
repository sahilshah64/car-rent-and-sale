// backend/models/Order.js
const mongoose = require('mongoose')

module.exports = mongoose.model('Order', new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items:  [{ car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, price: Number }],
  total:  { type: Number, required: true },
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' },
  shippingAddress: { address: String, city: String, state: String, zip: String },
  paymentMethod:   { type: String, default: 'card' },
}, { timestamps: true }))
