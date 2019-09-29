// import mongoose, { Schema } from 'mongoose';
const mongoose = require("mongoose");


let questionSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  text: String,
  property_id: String
//   correct_ans_id: String,

  
});

// Export Mongoose model
module.exports = mongoose.model('Questions', questionSchema)