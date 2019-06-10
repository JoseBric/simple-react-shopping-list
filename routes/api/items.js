const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

// @route  GET api/items
// @desc   Get All Items
// @acces  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => console.error(err))
  })
  
  // @route  POST api/items
  // @desc   Create An Item
  // @acces  Public
  router.post('/', (req, res) => {
    const { body } = req

    Item.create(body)
      .then(item => res.status(201).json(item))
  })

  // @route  DELETE api/items/:id
  // @desc   Delete An Item
  // @acces  Public
  router.delete('/:id', (req, res) => {
    const { id } = req.params

    Item.findByIdAndRemove(id)
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json({success: false, message: "Item not found"}))
  })

  // @route  PUT api/items/:id
  // @desc   Edit An Item
  // @acces  Public
  router.put('/:id', (req, res) => {
    const { body } = req
    const { id } = req.params
    
    Item.updateOne({_id: id}, {$set: {...body}})
      .then(() => res.json({success: true}))
      .catch(() => res.status(400).json({success: false}))
  })
  
module.exports = router