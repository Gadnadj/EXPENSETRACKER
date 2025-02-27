import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getDashboardData } from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/', protect, getDashboardData);

export default router;
