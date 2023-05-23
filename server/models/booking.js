const mongoose = require("mongoose");


const BookingSchema = {
  name:String,
  email:String,
  contact:Number,
  resortname:String,
  resortId:String,
  roomType:String,
  roomId:String,
  checkIn:String,
  checkOut:String,
  noOfRooms:Number,
  specialRequest:String,
  totalAmount:Number,
  bookingDate:String,
  bookingTime:String,
  bookingStatus:String,
  reservationId:String,
  client:mongoose.Schema.Types.ObjectId,
};

module.exports = mongoose.model("bookings", BookingSchema);
