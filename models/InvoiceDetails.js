const mongoose = require('mongoose')

const Schema = mongoose.Schema

const invoiceDetailsSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  total: Number,
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  invoiceId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Invoice'
  }
})

const InvoiceDetails = mongoose.model('InvoiceDetails', invoiceDetailsSchema)

module.exports = InvoiceDetails
