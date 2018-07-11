const mongoose = require('mongoose')

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
  name: String,
  date: Date,
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  description: String,
  contactName: String,
  address: String,
  created: Date,
  modified: Date,
})

invoiceSchema.pre('save', function (next) {
  this.created = new Date()

  next()
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
