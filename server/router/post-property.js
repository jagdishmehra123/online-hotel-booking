
require("dotenv").config();

const express = require("express");
const router = express.Router();
const HotelBook = require("../models/post-property");


//GET ALL HOTEL DATA TO SHOW TO CLIENTS
router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});
    
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});


//GET SPECIFIC HOTEL BY ID
router.get("/resort-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resortData = await HotelBook.find({ _id: id });
    res.json({ success: true, resortData: resortData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//get specific room details
router.get('/resort-room/:resortId/:roomId', async (req, resp) => {
  const { resortId, roomId } = req.params
  // console.log(resortId, roomId)
  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    let resortRoom = resort.rooms.find((room) => room.roomId === roomId)
    // console.log(resortRoom)
    // for (let i = 0; i < resort.rooms.length; i++) {
    //   if (resort.rooms[i].roomId === roomId) {
    //     // console.log('room found', resort.rooms[i])
    //     resortRoom = resort.rooms[i]
    //     break;
    //   }
    //   else {
    //     console.log('room not found width this id')
    //   }
    // }
    resp.json({ success: true, data: resortRoom })
  }
  catch (err) {
    resp.json({ success: false, message: `cannot find data ${err}`, })
  }
})




router.get('/images', async (req, resp) => {
  const imgArr = []
  try {
    const Data = await HotelBook.find()
    for (let property of Data) {
      for (let i = 0; i < property.rooms.length; i++) {
        for (let j = 0; j < property.rooms[i].imgUrl.length; j++) {
          imgArr.push(property.rooms[i].imgUrl[j])
        }
      }
    }
    // console.log('imgArr=>', imgArr)
    resp.json({ success: true, data: imgArr })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


//get images of specific property
router.post('/images/:id', async (req, resp) => {
  const resortId = req.params.id
  try {
    // console.log(resortId)
    const resort = await HotelBook.find({ _id: resortId })
    resp.json({ success: true, resort: resort })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


module.exports = router;
