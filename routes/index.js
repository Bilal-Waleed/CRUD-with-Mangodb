import express from 'express';
import webRoutes from './web/index.js';
import apiRoutes from './api/users.js';

const router = express.Router();
router.use('/', webRoutes); 
router.use('/api/users', apiRoutes); 
export default router;