// backend/models/Car.js
const mongoose = require('mongoose')

module.exports = mongoose.model('Car', new mongoose.Schema({
  name:         { type: String, required: true },
  model:        { type: String, required: true },
  brand:        { type: String, required: true },
  year:         { type: Number, required: true },
  price:        { type: Number, required: true },
  mileage:      { type: String, default: '0' },
  fuel:         { type: String, enum: ['Petrol','Diesel','Electric','Hybrid'], default: 'Petrol' },
  transmission: { type: String, enum: ['Automatic','Manual'], default: 'Automatic' },
  condition:    { type: String, enum: ['New','Used'], default: 'New' },
  type:         { type: String, enum: ['SUV','Sedan','Coupe','Pickup','MPV','Hatchback'] },
  image:        { type: String, default: '' },
  description:  { type: String, default: '' },
  inStock:      { type: Boolean, default: true },
}, { timestamps: true }))
