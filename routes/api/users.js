const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")

//User model
const User = require('../../models/User');

// @route POST api/Users
// @desc Register new user
// @access Public
router.post('/', (req,res)=>{
  const {name,email,password} = req.body

  //validations herer if any items are missing you send back the error that says you need to enter al fields
  if(!name || !email|| !password){
    return res.status(400).json({msg: 'Please enter all fields'})
  }

    // exiting user email check
    User.findOne({email})
    .then(user =>{
      if(user) return res.status(400).json({msg: 'Email already taken'})
      // if there is a user the response errors out otherwise it creates the user below
    const newUser = new User({
    name,
    email,
    password
   })

   // Create salt & hash password
   // bcyrpt uses salt to generate a password, the first item is the level or rounds to encryption then it takes a call back which  takes first a potential error then the salt you generated previously 
   bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(newUser.password,salt,(err,hash)=>{
       if(err) throw err;
       newUser.password = hash;
       newUser.save()
       // new user .save is exactly like in ruby and here it takes a call back then the response from the server sends back the username and email as well as the users id since we deal with errors above.
       .then(user =>{
         res.json({user:{
          id:user.id, 
          name:user.name,
          email:user.email
         }})
       })
     })
   })

  })
      
});





module.exports = router;