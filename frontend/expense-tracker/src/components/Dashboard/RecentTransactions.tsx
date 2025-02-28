import { Expense, Income } from '../../utils/types';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

type Props = {
    transactions: Expense[] | Income[] | undefined;

    onSeeMore: () => void;
}

const RecentTransactions = ({ transactions, onSeeMore }: Props) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-gray-900 dark:text-white transition-colors duration-300'>
                    Recent Transactions
                </h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={'type' in item && item.type === 'expense' ? (item as Expense).category : (item as Income).source}
                        icon={item.icon ?? ''}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;