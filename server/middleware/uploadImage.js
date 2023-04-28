const multer = require('multer');
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'harshada0611',
    api_key: 616754296691863,
    api_secret: '62EVwEk97ZaxzCdqYJe-RdJjkZw'
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9) + '.jpg'
        cb(nulll, file.fieldname + '_' + uniqueSuffix)
    }
})

const upload=multer({storage:storage})

const uploadToCloudinary=async (localFilePath)=>{
    console.log(localFilePath)

    try{
        const result=await cloudinary.Uploader 
        .upload(localFilePath)
        return result
    }
    catch(err){
        console.log(err.message)
    }
}

const sharp=require('sharp')

async function resizeImage(file){
    try{
        const result=await sharp(file)
        .resize({
            width:300,
            height:300
        })
        .toFormat('jpeg',{mozjpeg:true})
        .toFile(`uploads/resized-${file.split('\\')[1]}`)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={upload,uploadToCloudinary,resizeImage}