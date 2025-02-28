import { useState } from 'react';
import { Income } from '../../utils/types';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

type Props = {
    onAddIncome: (income: Income) => void;
}

const AddIncomeForm = ({ onAddIncome }: Props) => {

    const [incomeData, setIncomeData] = useState<{ source: string, amount: string, date: Date, icon: string }>({
        source: '',
        amount: '',
        date: new Date(),
        icon: ''
    });

    const handleChange = (key: string, value: any) => {
        setIncomeData((prev) => ({
            ...prev,
            [key]: key === 'date' ? new Date(value) : value
        }));
    };


    return (
        <div>

            <EmojiPickerPopup
                icon={incomeData.icon}
                onSelect={(selectedIcon: string) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={incomeData.source}
                onChange={({ target }) => handleChange('source', target.value)}
                label='Income Source'
                placeholder='Freelance, Salary, etc...'
                type='text'
            />

            <Input
                value={incomeData.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label='Amount'
                placeholder=''
                type='number'
            />

            <Input
                value={incomeData.date.toISOString().split('T')[0]}
                onChange={({ target }) => handleChange('date', target.value)}
                label='Date'
                placeholder=''
                type='date'
            />

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn add-btn-fill' onClick={() => onAddIncome({ ...incomeData, amount: parseInt(incomeData.amount), date: new Date(incomeData.date) })}>
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;