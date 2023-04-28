const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UsersData = require('../models/client')
const jwt = require('jsonwebtoken')
require('dotenv').config()



// Create a new account
router.post('/client-register', async (req, resp) => {
  const { name, email, password, } = req.body;
  console.log(req.body)
  try {
    const existingUser = await UsersData.findOne({ email: email })
    if (existingUser) {
      console.log('Account already exist', existingUser)
      resp.json({ success: false, message: 'Account already exist' })
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UsersData.create({ name, email, password: hashedPassword });
      console.log('newUser=>', newUser)
      resp.status(201).json({ success: true, message: 'Account created successfully', data: newUser });
    }
  }
  catch (error) {
    resp.status(400).json({ message: error });
  }
});



//Sign in route (only registered accounts can access)
router.post('/client-signin', async (req, resp) => {
  const { email, password } = req.body

  try {
    const existingAccount = await UsersData.findOne({ email: email })
    if (existingAccount) {
      const passwordMatch = await bcrypt.compare(password, existingAccount.password)
      if (passwordMatch) {
        const dataTobeSentToFrontend = {
          _id: existingAccount._id
        }
        const token = jwt.sign(dataTobeSentToFrontend, process.env.SECRET_KEY, { expiresIn: '1d' })
        console.log('signined in data=>', existingAccount)
        resp.json({ success: true, message: 'SignIn successful', data: { signinData: existingAccount, token: token } })
      }
      else {
        resp.json({ success: false, message: 'Password not correct' })
      }
    }
    else {
      resp.json({ success: false, message: 'User not found. Please create new account' })
    }
  }
  catch (error) {
    resp.status(400).json({ message: error.message });
  }
})


module.exports = router;