const router = require("express").Router()
const { response } = require("express")
const clientMiddleware = require('../middleware/client')
const Booking = require('../models/booking')
const HotelBook = require('../models/post-property')
const moment = require('moment')
const nodemailer = require('nodemailer')


router.post('/booking-form/:resortId/:roomId', clientMiddleware, async (req, resp) => {
  // console.log('client middilware id', req.client)
  let checkindate = req.body.checkIn
  let checkoutdate = req.body.checkOut

  //format dates using moment library
  checkindate = moment(checkindate).format('DD/MM/YYYY')
  checkoutdate = moment(checkoutdate).format('DD/MM/YYYY')
  // console.log(checkindate, checkoutdate)
  //ENDS
  // console.log('req.body of booking form=>', req.body)
  const resortId = req.params.resortId
  const roomId = req.params.roomId
  const noOfRooms = req.body.noOfRooms
  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    const getroom = resort.rooms.find(room => room.roomId === roomId)
    // console.log('initial rooms', getroom.availableRooms)
    if (getroom) {
      // console.log('room found', getroom)
      if (getroom.availableRooms === 0) {
        // console.log('no room available')
        resp.json({ success: false, message: 'Sorry, no rooms available' })
      }
      else if (getroom.availableRooms < noOfRooms) {
        // console.log(`Only ${getroom.availableRooms} rooms available. Please enter valid on of rooms you want to book`)
        resp.json({ sucees: false, message: `Only ${getroom.availableRooms} rooms available. Please enter valid number of rooms you want to book` })
      }
      else {
        const bookingData = await Booking.create({
          ...req.body,
          checkIn: checkindate,
          checkOut: checkoutdate,
          client: req.clientId
        })

        // console.log('booking data', bookingData)
        resp.json({ success: true, data: bookingData })
      }
    }

  }
  catch (err) {
    resp.json({ success: false, message: err })
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
      getroom.availableRooms = getroom.availableRooms - noOfRooms
      // console.log('updatedRoom', getroom.availableRooms)
      await resort.save()
      resp.json({ success: true })
    }
    else {
      response.json({ success: true, message: 'no room found' })
    }

  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


//send email of booking confirmation
router.post('/send-email',clientMiddleware, async (req, resp) => {
  console.log('body from send email', req.body.resort)


  try {
    const { email } = req.body
    const resort = await HotelBook.findOne({ _id: req.body.resortId })
    // console.log(resort)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harshadaa1997@gmail.com',   //process.env.EMAIL
        pass: 'pvrwfvhuibgplogr'             //process.env.PASSWORD 
      }
    })

    let mailOptions = {
      from: 'harshadaa1997@gmail.com',
      to: email,
      subject: 'Booking Confirmation from Cuba-Goa',
      text: `
      Reservation ID: ${req.body.reservationId},
      Resort Name : ${req.body.resortname},
      Room Type:${req.body.roomType},
      No of rooms booked: ${req.body.noOfRooms},
      Check-in Date: ${req.body.checkIn},
      Check-out Date: ${req.body.checkOut},
      Special Requests: ${req.body.specialRequest ? req.body.specialRequest : ' If you have any specific preferences or requirements, such as dietary restrictions or room preferences, please inform us in advance, and we will do our best to accommodate them.'},

      Arrival Time: Kindly let us know your estimated time of arrival so we can prepare to welcome you
      
      Deposit and Payment:
      Amount Paid: Rs. ${req.body.totalAmount}


      Please familiarize yourself with our cancellation and refund policy outlined in our terms and conditions
      Hotel Policy
      - Luxury tax and service tax applicable as per government of India regulations.
      - All prices are subject to availability.
      - Complimentary breakfast (in case the guests are entitled to) will be served as per Breakfast Menu between 08:30 AM to 10:30 AM only.
      - Outside Food and Drinks are strictly not allowed.
      - Washing of clothes in the room is not allowed.
      - You can just pay INR 100 per day and get 10 pieces of clothes washed on daily basis.
      - There will be no refund given if there is no complaint for room informed within 3 hrs of check in.
      - Late checkout charges of INR 300 will be applicable for any checkout after 11:00 am.
      - Security Deposit of INR 1000 to be paid at the time of check in for any damages which is refundable at the time of check out

      Cancellation Policy
      1. Any Cancellation request received up to 15 days prior check in will not attract any cancellation fees. 
      2. Any Cancellation request received from 15 days to 01 days prior to check in will attract 01 night retention charges. 
      3. Any cancellation on the day of check-in will be non refundable. 
      4. No show , early check out will be non refundable. 
      
      Peak Season Cancellation ( 20th December to 5th January) 
      1. Bookings once made will not be NON-REFUNDABLE, NON-AMENDABLE 
      2. Mandatory Gala Dinner Charges will be applicable for any guest staying on 25th Dec and 31st Dec.
      
      Booking Conditions
    - The total price of the reservation will be charged on the day of booking.
    - Any type of extra mattress or child's cot/crib is upon request and needs to be confirmed by management.
    - Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.



      Directions: We will provide detailed directions to our hotel to ensure a smooth journey.
      Address: ${resort.resortAddress}, ${resort.pincode}

      Contact Information: Should you have any questions or need assistance before your arrival, 
      please do not hesitate to contact our friendly team at 
      contact number:-${resort.resortPhoneNumber}
      

      We genuinely appreciate your patronage and cannot wait to welcome you to our beautiful establishment!
      
      Warmest regards,
      
      Cuba Goa
      Cuba Goa Reception
      cuba goa helpline number:- ${resort.cubaGoaHelpLineNumber}

    `
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return resp.status(500).json({ error: error })
      } else {
        console.log('Email sent: ' + info.response);
        return resp.status(200).json(info.response);
      }
    });
  }
  catch (err) {
    // console.log(err)
  }
})



//get specific customer all bookings
router.get('/get-bookings', clientMiddleware, async (req, resp) => {
  try {
    const bookingData = await Booking.find({ client: req.clientId })
    if (bookingData) {
      resp.json({ success: true, list: bookingData })
    } else {
      // console.log('no bookings with this id')
      resp.json({ success: false, message: 'no booking yet' })
    }
  }
  catch (err) {
    resp.json({ success: false, message: `err ${err}` })
  }
})





module.exports = router

