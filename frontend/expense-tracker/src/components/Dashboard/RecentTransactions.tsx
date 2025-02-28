import React from 'react';
import { Expense, Income } from '../../utils/types';
import { LuArrowRight } from 'react-icons/lu';

type Props = {
    transaction: Expense | Income | undefined;

    onSeeMore: () => void;
}

const RecentTransactions = ({ transaction, onSeeMore }: Props) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between '>
                <h5 className='text-lg'>
                    Recent Transactions
                </h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>


        </div>
    );
};

export default RecentTransactions;