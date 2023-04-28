const mongoose=require('mongoose')

const SpaSchema=new mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    date:Date
})

const SpaModel=mongoose.model('spaBookings', SpaSchema)
module.exports=SpaModel