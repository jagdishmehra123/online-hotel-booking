const mongoose = require("mongoose");


const BookingSchema = {
  name:String,
  email:String,
  contact:Number,
  totalAmount:Number,
  resortname:String,
  resortId:String,
  cart:Array,
  client:mongoose.Schema.Types.ObjectId
};

module.exports = mongoose.model("bookings", BookingSchema);
