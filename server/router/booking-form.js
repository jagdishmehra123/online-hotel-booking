const router = require("express").Router()
const clientMiddleware = require('../middleware/client')
const Booking = require('../models/booking')
const moment = require('moment')
// // Booking summary
// router.post("/add-cart", clientMiddleware, async (req, res) => {
//   try {
//     const cart = await cartModel.find({ userId: req.body.userId });
//     if (cart) {
//       throw new Error("Cart not found");
//     }
//     cart.items.push({
//       hotelId: hotelId,
//       checkInDate: checkInDate,
//       checkOutDate: checkOutDate,
//       numberOfRooms: numberOfRooms,
//       client: req.client
//     });

//     cart.totalPrice = req.body.totalPrice;
//     await cart.save();

//     res.status(200).json({ status: true, message: "success" });
//   } catch (er) {
//     res.status(400).json({ status: false, message: er.message });
//   }
// });

// router.post("/delete cartModel", async (req, res) => {
//   try {
//     const cart = await cartModel.find({ userId: req.body.userId });
//     if (cart) {
//       throw new Error("Cart not found");
//     }
//     const items = cartModel.items.filter(
//       (item) => item.hotelId !== req.body.hotelId
//     );
//     cart.items = items;
//     cart.totalPrice = req.body.totalPrice;
//     await cart.save();
//     req.status(200).json({ status: true, message: "success", data: cart });
//   } catch (er) {
//     req.status(400).json({ status: false, message: er.message });
//   }
// });

// router.post(" /cartModel-increment", async (req, res) => {
//   try {
//     const cart = await cartModel.find({ _id: req.body.cartId });
//     if (cart) {
//       throw new Error("Cart not found");
//     }
//     cart.totalPrice += req.body.price;
//     await cart.save();
//     res
//       .status(200)
//       .json({ status: true, message: "success increment", data: cart });
//   } catch (er) {
//     req.status(400).json({ status: false, message: er.message });
//   }
// });

// router.post(" /cartModel-decrement", async (req, res) => {
//   try {
//     const cart = await cartModel.find({ _id: req.body.userId });
//     if (cart) {
//       throw new Error("Cart not found");
//     }
//     cart.totalPrice -= price;
//     await cart.save();
//     res
//       .status(200)
//       .json({ status: true, message: "succefull decrement", data: cart });
//   } catch (er) {
//     req.status(400).json({ status: false, message: er.message });
//   }
// });

// const createOrder = async () => {
//   await instance.orders.create({
//     amount: total,
//     currency: "INR",
//     payment_capture: 1,
//     notes: {
//       booking_id: "YOUR_BOOKING_ID",
//     },
//   });
// };

// router.post("/payment", async (req, res) => {
//   const payment_request = req.body;
//   try {
//     const payment = await instance.payments.create(payment_request);
//     res
//       .status(200)
//       .json({ status: true, payment: payment, message: "sucess payment" });
//   } catch (er) {
//     res.status(400).json({ message: er.message, status: false });
//   }
// });


router.post('/booking-form', clientMiddleware, async (req, resp) => {
  console.log('client middilware id', req.client)
  let checkindate = req.body.checkIn
  let checkoutdate = req.body.checkOut

  //format dates using moment library
  checkindate = moment(checkindate).format('DD/MM/YYYY')
  checkoutdate = moment(checkoutdate).format('DD/MM/YYYY')
  console.log(checkindate,checkoutdate)
  //ENDS

  try {
    const bookingData = await Booking.create({
      ...req.body,
      checkIn: checkindate,
      checkOut: checkoutdate,
      client: req.clientId
    })
    console.log(bookingData)
    resp.json({ success: true, data: bookingData })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


router.get('/get-bookings', clientMiddleware, async (req, resp) => {
  try {
    const bookingData = await Booking.find({ client: req.clientId })
    resp.json({ success: true, list: bookingData })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


module.exports = router

