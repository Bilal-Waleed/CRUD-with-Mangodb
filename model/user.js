import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String } 
});

export default mongoose.model('User', userModel);