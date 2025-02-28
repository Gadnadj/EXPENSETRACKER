import { Expense } from '../../utils/types';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

type Props = {
    transactions: Expense[] | undefined;
    onSeeMore: () => void;
}

const ExpenseTransactions = ({ transactions, onSeeMore }: Props) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between mb-4'>
                <h5 className='text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300'>
                    Expenses
                </h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base transition-colors duration-300' />
                </button>
            </div>

            <div className='mt-6 space-y-4'>
                {
                    transactions?.slice(0, 5)?.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon || ''}
                            date={moment(expense.date).format('Do MMM YYYY')}
                            amount={expense.amount}
                            type='expense'
                            hideDeleteBtn
                        />
                    ))
                }
                {(!transactions || transactions.length === 0) && (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        No expense transactions available
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseTransactions;