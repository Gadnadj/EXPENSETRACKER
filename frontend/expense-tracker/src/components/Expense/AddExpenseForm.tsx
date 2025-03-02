import { useState, useContext } from 'react';
import { Expense } from '../../utils/types';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    onAddExpense: (expense: Expense) => void;
}

const AddExpenseForm = ({ onAddExpense }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);
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
                label='Expense Category'
                placeholder='Food, Transport, etc...'
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
                <button 
                    type='button' 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-violet-600 hover:bg-violet-700 text-white'
                            : 'bg-violet-500 hover:bg-violet-600 text-white'
                    }`}
                    onClick={() => onAddExpense({ 
                        ...expenseData, 
                        amount: parseFloat(expenseData.amount), 
                        date: new Date(expenseData.date) 
                    })}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;