// backend/models/Blog.js
const mongoose = require('mongoose')

module.exports = mongoose.model('Blog', new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  excerpt:  { type: String },
  image:    { type: String },
  category: { type: String },
  author:   { type: String },
}, { timestamps: true }))
