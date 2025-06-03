// routes/index.js
import express from 'express';
import webRoutes from './web/index.js';
import apiRoutes from './api/users.js';

const router = express.Router();
router.use('/', webRoutes); // Web routes
router.use('/api/users', apiRoutes); // API routes
export default router;