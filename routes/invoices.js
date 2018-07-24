var express = require('express')

var router = express.Router()
const InvoiceModel = require('../models/Invoice')
const InvoiceDetailModel = require('../models/InvoiceDetails')

router.post('/create', function(req, res, next) {
  const invoice = new InvoiceModel(req.body)

  invoice.save()
    .then(() => {
      res.json({ success: true, message: 'done' })
    })
    .catch((error) => {
      res.json({ success: false, error})
    })
})

router.put('/:id/edit', function(req, res, next) {
  InvoiceModel.findById({_id: req.params.id}, function(err,item){
    if(err) { return res.status(404)}
    item.name = req.body.payload.name
    item.description = req.body.payload.description
    item.contactName = req.body.payload.contactName
    item.address = req.body.payload.address
    item.save()
    res.status(200).json({ success: true })
  })
})

router.get('/:id', function(req, res, next) {
  InvoiceModel.findOne({_id:req.params.id})
    .then((item) => {
      res.json({ item })
    })
})

router.delete('/:id/delete', (req, res, next) => {
  InvoiceModel.deleteOne({_id: req.params.id},
    (error) =>{
      if(error) return res.status(404)
      res.status(200).json({ success: true })
    }  
  )
})

// router.get('/list', (req, res) => {
//   const pageNumber = req.query.PageNumber
//   const recordsPerPage = 10
//   const searchText = req.query.searchText

//   InvoiceModel.find({ skip: pageNumber * recordsPerPage, limit: recordsPerPage })
//     .then(items => {
//       if(!items) { return res.status(404)}
//       return res.status(200).json({ success:true, items})
//     })
// })

router.get('/detail/:id', function(req, res, next) {
  InvoiceDetailModel.findOne({_id:req.params.id})
    .then((item) => {
      res.json({ item })
    })
})

router.get('/:id/details', function(req, res, next) {
  const { page } = req.query
  const invoicesPerPage = 5

  InvoiceDetailModel
    .find({invoiceId:  req.params.id})
    .skip((page - 1) * invoicesPerPage)
    .limit(invoicesPerPage)
    .then(items => {
      if(!items) { return res.status(404)}
      res.status(200).json({ success:true, items})
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, error})
    })
})

router.post('/:id/details/create', function(req, res, next) {
  try {
    const invoiceDetail = new InvoiceDetailModel(req.body)
  invoiceDetail.save()
    .then(() => {
      console.log(1)
      res.json({ success: true, message: 'done' })
    })
    .catch((error) => {
      console.log(error)
      res.json({ success: false, error})
    })
  } catch (error) {
    console.log(error)
  }
  
})

router.put('/details/:detailId/edit', function(req, res, next) {
  InvoiceDetailModel.findByIdAndUpdate
    (
      req.params.detailId,
      req.body,
      { new: true },
      (error, item) => {
        if(error) { return res.status(404)}
        res.status(200).json({ success: true, item })
      }
    )
})

router.post('/:id/details/create', (req, res, next) => {
  const detail = new InvoiceDetailsModel(req.body)
  detail.save()
    .then( () => {
      res.status(200).json({ success: true, message: 'done' })
    })
    .catch( (error) => {
      res.json({ success: false, error})
    })
})

router.delete('/details/:id/delete', (req, res, next) => {
  InvoiceDetailModel.deleteOne({_id: req.params.id},
    (error) =>{
      if(error) return res.status(404)
      res.status(200).json({ success: true })
    }  
  )
})

module.exports = router
