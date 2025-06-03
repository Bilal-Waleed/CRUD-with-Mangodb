import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../../services/userService.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    if (!users.length) {
      return res.status(404).json({ error: true, message: 'No users found', data: null });
    }
    res.status(200).json({ error: false, message: 'Users data fetched successfully', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: true, message: 'Server error while fetching users', data: null });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json({ error: false, message: 'User found', data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(error.message === 'Invalid ID format' || error.message === 'User not found' ? 404 : 500).json({ error: true, message: error.message, data: null });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ error: false, message: 'User created successfully', data: user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(error.message === 'Missing required fields' || error.message === 'User with this email already exists' ? 400 : 500).json({ error: true, message: error.message, data: null });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json({ error: false, message: 'User updated successfully', data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(error.message === 'Invalid ID format' || error.message === 'User not found' || error.message === 'At least one field must be provided' || error.message === 'User with this email already exists' ? 400 : 500).json({ error: true, message: error.message, data: null });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ error: false, message: 'User deleted successfully', data: null });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(error.message === 'Invalid ID format' || error.message === 'User not found' ? 404 : 500).json({ error: true, message: error.message, data: null });
  }
});

export default router;