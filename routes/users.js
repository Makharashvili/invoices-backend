const express = require('express')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/User')
const InvoiceModel = require('../models/Invoice')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ users: [] })
})

router.post('/auth', (req, res) => {
  const { username } = req.body

  UserModel.findOne({ username })
    .then(user => {
      if (!user) {
        return res.json({ success: false, error: 'user not found' })
      }

      jwt.sign({ username, email: user.email, Id: user._id }, 'secret', (error, token) => {
        return res.json({
          success: true,
          token,
          userData: {
            username,
            email: user.email,
            Id: user._id
          }
        })
      })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/check-token', (req, res) => {
  const wholeToken = req.headers.authorization
  const actualToken = wholeToken.split(' ')[1]

  jwt.verify(actualToken, 'secret', (error, data) => {
    if (error) {
      return res.json({ success: true, error })
    }

    return res.json({ success: true, userData: data })
  })
})

router.post('/register', (req, res) => {
  const user = new UserModel(req.body)
  user.save()
    .then( () => {
      res.json({ success: true, message: 'done' })
    })
    .catch( (error) => {
      res.json({ success: false, error})
    })
})

router.get('/:id/invoices', (req, res) => {
  const { page, searchText } = req.query
  const invoicesPerPage = 5

  if (!page) {
    return res.json({ success: false, message: 'page is required !!' })
  }

  const skip = (parseInt(page) - 1) * invoicesPerPage

  const query = { userId: req.params.id }

  if (searchText) {
    query.name = new RegExp(searchText)
  }

  InvoiceModel.find(query)
    .skip(skip)
    .limit(invoicesPerPage)
    .then(items => {
      if(!items) { return res.status(404)}
      return res.status(200).json({ success:true, items})
    })
})


module.exports = router
