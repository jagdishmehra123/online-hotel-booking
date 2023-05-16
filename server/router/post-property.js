
require("dotenv").config();

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const HotelBook = require("../models/post-property");
const adminMiddleware = require('../middleware/admin')

const secretKey = "DgFtQm0k8J8B7IQN9WOtPFbD";
const keyId = "rzp_test_AkYBZb1z8U30uR";

const instance = new Razorpay({
  key_id: keyId,
  key_secret: secretKey,
});




router.post("/hotelbook", async (req, res) => {
  try {
    const resortData = await HotelBook.create(req.body);
    res.json({ success: true, data: resortData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GET DATA OF SPECIFIC OWNER (login required)
router.get('/my-resorts', adminMiddleware, (req, resp) => {

})



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



//to update hotelBook by id
router.put("/hotelbook/:id", async (req, res) => {
  // console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, { rooms: req.body.rooms });
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//Update total rooms in DB after booking
router.patch("/updateTotalRoomsinDb/:id", async (req, res) => {
  try {
    // console.log(req.params.id)
    // const name = req.body.resort.resortName
    // console.log(req.body.resort.resortName)
    // const room = await HotelBook.find({resortName: name});
    // console.log(room)
    let acknowledged = false
    for (let i = 0; i < req.body.length; i++) {
      acknowledged = false;
      console.log("ROOM", i, "=>")
      const _id = req.body[i].room._id
      const updatedAvailableRooms = req.body[i].room.availableRooms
      let ack
      const roomUpdated = await HotelBook.updateOne({
        "rooms._id": _id
      },
        {
          "$set": {
            "rooms.$.availableRooms": updatedAvailableRooms
          }
        })
      acknowledged = roomUpdated.acknowledged
      console.log(roomUpdated)
    }
    if (acknowledged == true) {
      res.status(200).json({
        message: "Total Rooms Data Updated Successfully"
      })
    } else {
      res.status(200).json({
        message: "Total Rooms Data Updation Failed"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, status: false });
  }
})




// delete a hotel Book
router.delete("/hotelbook/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//get specific room details
router.get('/resort-room/:resortId/:roomId', async (req, resp) => {
  const { resortId, roomId } = req.params
  console.log(resortId, roomId)
  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    let resortRoom;
    for (let i = 0; i < resort.rooms.length; i++) {
      if (resort.rooms[i].roomId === roomId) {
        console.log('room found', resort.rooms[i])
        resortRoom = resort.rooms[i]
        break;
      }
      else {
        console.log('room not found width this id')
      }
    }
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
    console.log('imgArr=>', imgArr)
    resp.json({success:true, data:imgArr})
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})





module.exports = router;
