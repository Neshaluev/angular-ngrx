const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const categories = await Category.find({user: req.user.id})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Category.remove({positions: req.params.id})
    await Position.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Категория удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const category = new Category({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  console.log(req.body)
  const updated = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    positions: req.body.positions,
    //imageSrc: 'http://lorempixel.com/400/200/sports/111'
  }

  if (req.file) {
    updated.imageSrc = req.file.path || ''
  }

  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
