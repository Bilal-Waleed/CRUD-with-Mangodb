import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../../services/userService.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { error: null, formData: {} }); 
});

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.render('read', { users, error: null });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.render('read', { users: [], error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    await createUser(req.body);
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.render('index', { error: error.message, formData: req.body });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.render('edit', { user, error: null });
  } catch (error) {
    res.redirect('/users');
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.redirect('/users');
  } catch (error) {
    const user = await getUserById(req.params.id).catch(() => null);
    res.render('edit', { user, error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.redirect('/users');
  }
});

router.get('/404', (req, res) => {
  res.status(404).render('404');
});

export default router;