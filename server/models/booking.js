const mongoose = require("mongoose");


const BookingSchema = {
  name:String,
  email:String,
  contact:Number,
  resortname:String,
  resortId:String,
  roomType:String,
  checkIn:String,
  checkOut:String,
  specialRequest:String,
  totalAmount:Number,
  client:mongoose.Schema.Types.ObjectId
};

module.exports = mongoose.model("bookings", BookingSchema);
