import { useState } from 'react';
import { Expense } from '../../utils/types';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

type Props = {
    onAddExpense: (expense: Expense) => void;
}

const AddExpenseForm = ({ onAddExpense }: Props) => {

    const [expenseData, setExpenseData] = useState<{ category: string, amount: string, date: Date, icon: string }>({
        category: '',
        amount: '',
        date: new Date(),
        icon: ''
    });

    const handleChange = (key: string, value: any) => {
        setExpenseData((prev) => ({
            ...prev,
            [key]: key === 'date' ? new Date(value) : value
        }));
    };


    return (
        <div>

            <EmojiPickerPopup
                icon={expenseData.icon}
                onSelect={(selectedIcon: string) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={expenseData.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label='Expense Source'
                placeholder='Freelance, Salary, etc...'
                type='text'
            />

            <Input
                value={expenseData.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label='Amount'
                placeholder=''
                type='number'
            />

            <Input
                value={expenseData.date.toISOString().split('T')[0]}
                onChange={({ target }) => handleChange('date', target.value)}
                label='Date'
                placeholder=''
                type='date'
            />

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn add-btn-fill' onClick={() => onAddExpense({ ...expenseData, amount: parseInt(expenseData.amount), date: new Date(expenseData.date) })}>
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;