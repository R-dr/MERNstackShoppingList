const express = require('express')
const router = express.Router()


//Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', (req,res)=>{
  Item.find()
  .sort({ date: -1})
  .then(items =>res.json(items));
});

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/', (req,res)=>{
  const newItem = new Item({
    name: req.body.name
  });
  //promise based how to save an item
  newItem.save().then(item => res.json(item))

});

// @route delete api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req,res)=>{
  Item.findById(req.params.id)
  // if it succeeds send back success
  .then(item => item.remove()).then(()=> res.json({success:true}))
  //if not it sends back success false
  .catch((e)=> res.status(404).json({success:false}))  
  
});



module.exports = router;