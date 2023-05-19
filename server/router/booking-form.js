const router = require("express").Router()
const { response } = require("express")
const clientMiddleware = require('../middleware/client')
const Booking = require('../models/booking')
const HotelBook = require('../models/post-property')
const moment = require('moment')



router.post('/booking-form', clientMiddleware, async (req, resp) => {
  // console.log('client middilware id', req.client)
  let checkindate = req.body.checkIn
  let checkoutdate = req.body.checkOut

  //format dates using moment library
  checkindate = moment(checkindate).format('DD/MM/YYYY')
  checkoutdate = moment(checkoutdate).format('DD/MM/YYYY')
  // console.log(checkindate, checkoutdate)
  //ENDS
  // console.log('req.body of booking form=>', req.body)

  try {
    const bookingData = await Booking.create({
      ...req.body,
      checkIn: checkindate,
      checkOut: checkoutdate,
      client: req.clientId
    })
    // console.log('booking data', bookingData)
    resp.json({ success: true, data: bookingData })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


router.get('/get-bookings', clientMiddleware, async (req, resp) => {
  try {
    const bookingData = await Booking.find({ client: req.clientId })
    if (bookingData) {
      resp.json({ success: true, list: bookingData })
    } else {
      console.log('no bookings with this id')
      resp.json({ success: false, message: 'no booking yet' })
    }
  }
  catch (err) {
    resp.json({ success: false, message: `err ${err}` })
  }
})



//update room data after booking
router.patch('/update-room/:resortId/:roomId', async (req, resp) => {
  const { resortId, roomId } = req.params
  // console.log(resortId, roomId)
  // console.log(req.body)
  const { noOfRooms } = req.body

  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    const getroom = resort.rooms.find(room => room.roomId === roomId)
    console.log('initial rooms', getroom.availableRooms)
    if (getroom) {
      // console.log('room found', getroom)
      if (getroom.availableRooms === 0) {
        console.log('no room available')
        resp.json({ success: false, message: 'Sorry, no rooms available' })
      }
      else if (getroom.availableRooms < noOfRooms) {
        console.log(`Only ${getroom.availableRooms} rooms available. Please enter valid on of rooms you want to book`)
        resp.json({ sucees: false, message: `Only ${getroom.availableRooms} rooms available. Please enter valid number of rooms you want to book` })
      }
      else {
        getroom.availableRooms = getroom.availableRooms - noOfRooms
        console.log('updatedRoom', getroom.availableRooms)
        await resort.save()
        resp.json({ success: true })
      }

    }
    else {
      response.json({ success: true, message: 'no room found' })
    }

  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


module.exports = router

