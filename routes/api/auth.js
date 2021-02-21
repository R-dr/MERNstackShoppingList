const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../../Middleware/Auth') 
//User model
const User = require("../../models/User");

// @route POST api/auth
// @desc Authenticate the user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  //validations here if any items are missing you send back the error that says you need to enter al fields
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // exiting user email check
  User.findOne({ email }).then((user) => {
    // different to the sign up here we check that there is a user 
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    
    // Validate password
    // bcrypts compare method takes the plain text password and compares it to the encrypted password on the data base and returns a promise that gives us a boolean based on weather or not the passwords match.
    bcrypt.compare(password,user.password)
    .then(isMatch =>{
      if(!isMatch) return res.status(400).json({msg:'invalid credentials'});
      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        // thisis the callback for error handling and finally issuing the token
        (err,token) =>{
          if(err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          })

        }
      )
    })

  });
});
// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id)
  //returns the user that signs in minus the password
  .select('-password')
  .then(user=> res.json(user))
})
module.exports = router;
