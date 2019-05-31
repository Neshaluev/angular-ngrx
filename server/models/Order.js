const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  capital: {
    type: Number,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },

})

module.exports = mongoose.model('orders', orderSchema)

