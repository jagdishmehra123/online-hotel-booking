const jwt=require('jsonwebtoken')

const clientMiddleware=(req,resp,next)=>{
    const token=req.headers.authorization
try{
    if(token){
            const {_id}=jwt.verify(token,process.env.SECRET_KEY)
            console.log('id from middleware',token,process.env.SECRET_KEY)

            if(_id){
                req.clientId=_id
                next();
            }
    }
    else{
        resp.json({success:false, message:"Access denied. Token expired"})
    }
}
catch(err){
    resp.json({success:false, message:err})
}
}
module.exports=clientMiddleware