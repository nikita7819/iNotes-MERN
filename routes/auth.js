const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

//ROUTE-1 : create new user: POST: (/api/auth/createuser): no login required
router.post('/createuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be 5 or more character long.').isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors return bad request and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether user with same email exist already
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success:false, error: "sorry, a user with this email is already exists"})
    }
    //generating salt and making hash for password
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    //create a user if not exists
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    const data = {
      user: {
        id: user.id
      }
    }
    //sign the token for authentication
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({success:true, authToken})
  }
  catch (error) {
    //for any network or server side issues 
    console.error(error.message)
    res.status(500).send("Internal server error.")
  }

})

//ROUTE-2 : login exisiting user using POST: (/api/auth/login)  no login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password should not be blank.').exists(),
], async (req, res) => {
  //if there are errors return bad request and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  //verify user's credentials
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success:false, error: "Please try to login with correct credentials" });
    }
    //comparing user password
    const passCompare = await bcrypt.compare(password, user.password); //return T/F
    if (!passCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({success:true,authToken})
  }
  catch (error) {
    //for any network or server side issues 
    console.error(error.message)
    res.status(500).send("Internal server error.")
  }
})

//ROUTE-3 : Get user details using POST ((/api/auth/getuser)) -- login required
router.post('/getuser', fetchuser, async (req, res) => { 
  try {
    userId = req.user.id;
    //getting details by finding id -> except password
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    //for any network or server side issues 
    console.error(error.message)
    res.status(500).send("Internal server error.")
  }
})

module.exports = router