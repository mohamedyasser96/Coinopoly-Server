const mongoose = require("mongoose");
var playerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  code: String,
  balance: Number,
  turn: Boolean
  
});

// Export Mongoose model
module.exports = mongoose.model('players', playerSchema)