const express = require('express')

const UserModel = require('../models/User')
const InvoiceModel = require('../models/Invoice')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ users: [] })
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

  InvoiceModel.find({ userId: req.params.id, skip })
    .then(items => {
      if(!items) { return res.status(404)}
      return res.status(200).json({ success:true, items})
    })
})


module.exports = router
