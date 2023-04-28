const mongoose=require('mongoose')


const RatingSchema=new mongoose.Schema({
    name:String,
    email:String,
    platform:String,
    additionalComments:String,
    rating:Number,
    resortId:String
})


const RatingModel=mongoose.model('ratings', RatingSchema)
module.exports=RatingModel
