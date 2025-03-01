import { useContext } from 'react';
import { Expense, Income } from '../../utils/types';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    transactions: (Expense | Income)[] | undefined;
    onSeeMore: () => void;
}

const RecentTransactions = ({ transactions, onSeeMore }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className='flex items-center justify-between mb-4'>
                <h5 className={`text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Recent Transactions
                </h5>

                <button 
                    className={`flex items-center gap-3 px-4 py-1.5 rounded-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${
                        isDarkMode 
                            ? 'text-gray-300 hover:text-purple-400 bg-gray-700/50 hover:bg-purple-900/30 border-gray-600/50 hover:border-purple-500/30' 
                            : 'text-gray-700 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 border-gray-200/50 hover:border-purple-200'
                    }`} 
                    onClick={onSeeMore}
                >
                    See All <LuArrowRight className='text-base transition-colors duration-300' />
                </button>
            </div>

            <div className='mt-6 space-y-4'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={'source' in item ? item.source : item.category}
                        icon={item.icon || ''}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        type={'source' in item ? 'income' : 'expense'}
                        hideDeleteBtn
                    />
                ))}
                {(!transactions || transactions.length === 0) && (
                    <div className={`text-center py-4 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        No transactions available
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;