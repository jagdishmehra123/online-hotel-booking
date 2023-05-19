const router = require("express").Router()
const clientMiddleware = require('../middleware/client')
const Booking = require('../models/booking')
const moment = require('moment')



router.post('/booking-form',clientMiddleware, async (req, resp) => {
  console.log('client middilware id', req.client)
  let checkindate = req.body.checkIn
  let checkoutdate = req.body.checkOut

  //format dates using moment library
  checkindate = moment(checkindate).format('DD/MM/YYYY')
  checkoutdate = moment(checkoutdate).format('DD/MM/YYYY')
  console.log(checkindate, checkoutdate)
  //ENDS
  console.log('req.body of booking form=>', req.body)

  try {
    const bookingData = await Booking.create({
      ...req.body,
      checkIn: checkindate,
      checkOut: checkoutdate,
      client: req.clientId
    })
    console.log('booking data',bookingData)
    resp.json({ success: true, data: bookingData })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


router.get('/get-bookings',clientMiddleware, async (req, resp) => {
  console.log('req.clientId',req.clientId)
  try {
    const bookingData = await Booking.find({client:req.clientId})
    resp.json({ success: true, list: bookingData })
  }
  catch (err) {
    resp.json({ success: false, message: `err ${err}` })
  }
})


module.exports = router

