import { useContext } from 'react';
import { Expense } from '../../utils/types';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    transactions: Expense[];
    onDelete: (id: string) => void;
    onDownload: () => void;
}

const ExpenseList = ({ transactions, onDelete, onDownload }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className='flex items-center justify-between mb-6'>
                <h5 className={`text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    All Expenses
                </h5>

                <button 
                    className={`flex items-center gap-3 px-4 py-1.5 rounded-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${
                        isDarkMode 
                            ? 'text-gray-300 hover:text-purple-400 bg-gray-700/50 hover:bg-purple-900/30 border-gray-600/50 hover:border-purple-500/30' 
                            : 'text-gray-700 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 border-gray-200/50 hover:border-purple-200'
                    }`} 
                    onClick={onDownload}
                >
                    <LuDownload className='text-base' />
                    Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense?.icon ?? ''}
                        date={moment(expense.date).format('Do MMM YYYY')}
                        amount={expense.amount}
                        type='expense'
                        hideDeleteBtn
                        onDelete={() => onDelete(expense._id ?? '')}
                    />
                ))}
                {transactions.length === 0 && (
                    <div className={`col-span-2 text-center py-8 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        No expense transactions available
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;