import express from 'express';
import { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/expenseexcel', protect, downloadExpenseExcel);
router.get('/:id', protect, deleteExpense);

export default router;