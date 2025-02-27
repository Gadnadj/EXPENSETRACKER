import Expense from '../models/Expense.js';
import xlsx from 'xlsx'

//add new expense
export const addExpense = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    try {
        const { icon, category, amount, date } = req.body;
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields required' });
        }
        const newExpense = new Expense({ userId, icon, category, amount, date });
        await newExpense.save();
        return res.status(200).json(newExpense);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

//get all expense
export const getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        return res.status(200).json(expense);

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

//delete one expense by id
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

//download expense excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'expense');
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};