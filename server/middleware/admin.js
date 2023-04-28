const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminMiddleware=(req,resp,next)=>{
    token=req.headers.auhtorization
    try{
        const {_id}=jwt.verify(token,process.env.SECRET_KEY)
        if(_id){
            req.admin=_id
            next();
        }
        else{
            resp.json({success:false, message:'Access denied'})
        }
    }
    catch(err){
        resp.json({success:false, message:err})
    }
}

module.exports=adminMiddleware