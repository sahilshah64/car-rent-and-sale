// backend/controllers/blogController.js
const Blog = require('../models/Blog')

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const [posts, total] = await Promise.all([
      Blog.find().sort('-createdAt').skip((+page - 1) * +limit).limit(+limit),
      Blog.countDocuments(),
    ])
    res.json({ posts, total, page: +page, totalPages: Math.ceil(total / +limit) })
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.getOne = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.create = async (req, res) => {
  try { res.status(201).json(await Blog.create(req.body)) }
  catch (e) { res.status(400).json({ message: e.message }) }
}

exports.update = async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (e) { res.status(400).json({ message: e.message }) }
}

exports.remove = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json({ message: 'Deleted' })
  } catch (e) { res.status(500).json({ message: e.message }) }
}
