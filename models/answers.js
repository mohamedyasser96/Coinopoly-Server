import mongoose, { Schema } from 'mongoose';

var answerSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  text: String,
  question_id: String,
  correct: Boolean

  
});

// Export Mongoose model
export default mongoose.model('Answers', answerSchema);