const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//name and export the schema
module.exports = Item = mongoose.model('item', ItemSchema)