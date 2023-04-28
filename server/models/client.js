const mongoose=require('mongoose')

const ClientSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const ClientModel=mongoose.model('client-register', ClientSchema)
module.exports=ClientModel