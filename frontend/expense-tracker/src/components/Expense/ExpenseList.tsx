import { Expense } from '../../utils/types';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

type Props = {
    transactions: Expense[];
    onDelete: (id: string) => void;
    onDownload: () => void;
}

const ExpenseList = ({ transactions, onDelete, onDownload }: Props) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                    All Expenses
                </h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' />
                    Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
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
            </div>
        </div>
    );
};

export default ExpenseList;