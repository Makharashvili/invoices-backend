var express = require('express')
var router = express.Router()

const UserModel = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({})
})

module.exports = router
