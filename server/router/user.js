const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UsersData = require('../models/registration')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const clientMiddleware = require('../middleware/client')


// Create a new account
router.post('/register', [
  body('name').notEmpty().withMessage('User is required').isLength({ min: 3 }).withMessage('name must be greater than 3 characters'),
  body('contact').notEmpty().withMessage('Contact number is reqired').isLength({ min: 10, max: 10 }).withMessage('contact number must be of 10 digits'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
], async (req, resp) => {
  const { name, email, password, contact } = req.body;
  console.log(req.body)
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return resp.json({ success: false, message: errors.array() })
    }
    const existingUser = await UsersData.findOne({ contact: contact })
    if (existingUser) {
      console.log('Account already exist', existingUser)
      resp.json({ success: false, message: 'Account already exist' })
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UsersData.create({ name, email, contact, password: hashedPassword });
      console.log('newUser=>', newUser)
      resp.status(201).json({ success: true, message: 'Account created successfully', data: newUser });
    }
  }
  catch (error) {
    resp.status(400).json({ message: error });
  }
});





//Sign in route (only registered accounts can access)
router.post('/signin', [
], async (req, resp) => {
  const { email, password } = req.body

  try {
    const existingAccount = await UsersData.findOne({ email: email })
    if (existingAccount) {
      const passwordMatch = await bcrypt.compare(password, existingAccount.password)
      if (passwordMatch) {
        const dataTobeSentToFrontend = {
          _id: existingAccount._id
        }
        const token = jwt.sign(dataTobeSentToFrontend, "secretKey", { expiresIn: '1d' })
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


//get user/customer's data
router.get('/user-details/', clientMiddleware, async (req, resp) => {
  console.log(req.params.id)
  try {
    const details = await UsersData.findOne({ _id: req.clientId })
    if (details) {
      resp.json({ success: true, details: details })
    }
    else {
      resp.json({ success: false, message: "Cannot find any details" })
    }
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})

module.exports = router;