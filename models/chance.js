const mongoose = require("mongoose");
var chanceSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  action: Number
  
});

// Export Mongoose model
module.exports = mongoose.model('chance', chanceSchema)