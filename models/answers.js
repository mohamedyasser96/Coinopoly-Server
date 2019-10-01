const mongoose = require("mongoose");
var answerSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  text: String,
  question_id: String,
  correct: Boolean

  
});

// Export Mongoose model
module.exports = mongoose.model('Answers', answerSchema)