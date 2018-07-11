const mongoose = require('mongoose')

const Schema = mongoose.Schema

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  created: Date,
  activated: Boolean,
})

userSchema.pre('save', function (next) {
  this.created = new Date()
  this.activated = true

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
