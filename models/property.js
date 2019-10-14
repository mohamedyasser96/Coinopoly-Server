const mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  Value: Number,
  rentValue: Number,
  info: String,
  owner: String,
  url: String
  
});

// Export Mongoose model
module.exports = mongoose.model('properties', propertySchema)
