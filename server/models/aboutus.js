const mongoose = require("mongoose");

const aboutusSchema = new mongoose.Schema({
    bannerImgUrl: { type: String },
    heading1: { type: String },
    heading2: { type: String },
    heading3: { type: String },
    description: { type: String }
})

module.exports = mongoose.model('aboutus', aboutusSchema);