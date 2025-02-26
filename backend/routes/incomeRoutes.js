import express from 'express';
import { addIncome, getAllIcome, deleteIncome, downloadIncomeExcel } from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIcome);
router.get('/downloadexcel', protect, downloadIncomeExcel);
router.get('/:id', protect, deleteIncome);

export default router;