import Income from '../models/Income.js'
import xlsx from 'xlsx'

//Add income source user
export const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        //Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//get all incomes
export const getAllIcome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//delete one income
export const deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

};

//download data in excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
