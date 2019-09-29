import mongoose, { Schema } from 'mongoose';

var playerSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  code: String,
  
});

// Export Mongoose model
export default mongoose.model('players', playerSchema);