import mongoose, { Schema } from 'mongoose';

var propertySchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  Value: Number,
  info: String
  
});

// Export Mongoose model
export default mongoose.model('players', propertySchema);
