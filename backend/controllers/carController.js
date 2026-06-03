// backend/controllers/carController.js
const Car = require('../models/Car')

exports.getAll = async (req, res) => {
  try {
    const { page=1, limit=8, condition, brand, model, type, minPrice, maxPrice, sort='-createdAt' } = req.query
    const q = {}
    if (condition) q.condition = condition
    if (brand)     q.brand = { $regex: brand, $options: 'i' }
    if (model)     q.model = { $regex: model, $options: 'i' }
    if (type)      q.type  = type
    if (minPrice || maxPrice) {
      q.price = {}
      if (minPrice) q.price.$gte = Number(minPrice)
      if (maxPrice) q.price.$lte = Number(maxPrice)
    }
    const [cars, total] = await Promise.all([
      Car.find(q).sort(sort).skip((+page-1)*+limit).limit(+limit),
      Car.countDocuments(q),
    ])
    res.json({ cars, total, page: +page, totalPages: Math.ceil(total/+limit) })
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.getOne   = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

exports.create   = async (req, res) => {
  try { res.status(201).json(await Car.create(req.body)) }
  catch (e) { res.status(400).json({ message: e.message }) }
}

exports.update   = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (e) { res.status(400).json({ message: e.message }) }
}

exports.remove   = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json({ message: 'Deleted' })
  } catch (e) { res.status(500).json({ message: e.message }) }
}
