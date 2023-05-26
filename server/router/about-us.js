const router = require('express').Router()
const Aboutus=require('../models/aboutus')

router.get("/about-us", async (req, res) => {
    try {
        const data = await Aboutus.find();
        res.status(200).json({ success:true,data: data });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports=router