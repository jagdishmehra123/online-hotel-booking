const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("../models/admin");
const Contactus = require("../models/contactus");


// Register
router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail){
      return res.status(409).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newRegistration = await Admin.create({
      email: email,
      password: hash,
      name: name,
    });

    res.status(200).json({ status: true, message: "succefully registerd" });
  } catch (er) {
    res.status(400).json({ status: false, message: er.message });
  }
});
// Login //
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
    // return res.status(400).json({email: email , password: password });
    const user = await Admin.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Email not found" });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res
        .status(400)
        .json({ status: false, message: "Invalid password" });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res
      .status(200)
      .json({ status: true, message: "succes login", id: user._id, username: user.name, token: token });
  } catch (er) {
    res.status(400).json({ status: false, message: er.message });
  }
});

router.post("/contactus", async (req, res) => {
  try {
    const contactus = await Contactus.create(req.body);
    res.status(200).json(contactus);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/contactus", async (req, res) => {
  try {
    const contactus = await Contactus.find({});
    res.status(200).json(contactus);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});

//to  get   contactus by id
router.get("/contactus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactus = await Contactus.findById(id);
    res.status(200).json(contactus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//to update Contactus by id
router.put("/contactus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactus = await Contactus.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!contactus) {
      return res
        .status(404)
        .json({ message: `cannot find any Contactus with ${id}` });
    }
    const updatedContactus = await Contactus.findById(id);
    res.status(200).json(updatedContactus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a Contactus
router.delete("/contactus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactus = await Contactus.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!contactus) {
      return res
        .status(404)
        .json({ message: `cannot find any Contactus with ${id}` });
    }

    res.status(200).json(contactus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
