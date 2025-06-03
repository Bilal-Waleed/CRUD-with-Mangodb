import mongoose from 'mongoose';
import userModel from '../model/user.js';

export const getAllUsers = async () => await userModel.find();
export const getUserById = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID format');
  const user = await userModel.findById(id);
  if (!user) throw new Error('User not found');
  return user;
};
export const createUser = async ({ name, email, image }) => {
  if (!name || !email) throw new Error('Missing required fields');
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error('User with this email already exists');
  const user = new userModel({ name, email, image });
  return await user.save();
};
export const updateUser = async (id, { name, email, image }) => {
  if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID format');
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (image) updateData.image = image;
  if (Object.keys(updateData).length === 0) throw new Error('At least one field must be provided');
  if (email) {
    const existingUser = await userModel.findOne({ email, _id: { $ne: id } });
    if (existingUser) throw new Error('User with this email already exists');
  }
  const user = await userModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!user) throw new Error('User not found');
  return user;
};
export const deleteUser = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID format');
  const user = await userModel.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};