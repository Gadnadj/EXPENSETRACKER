import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { useEffect, useState } from 'react';
import { Income } from '../../utils/types';
import { prepareIncomeBarChartdata } from '../../utils/helper';

type Props = {
    transactions: Income[];
    onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: Props) => {

    const [chartData, setChartData] = useState<{ month: string; amount: number; source: string; }[]>([]);

    useEffect(() => {
        const result = prepareIncomeBarChartdata(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>
                        Income Overview
                    </h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>

                <button className='add-btn' onClick={onAddIncome}>
                    <LuPlus className='text-lg cursor-pointer' />
                    Add Income
                </button>

            </div>

            <div className='mt-10'>
                <CustomBarChart
                    data={chartData}
                />
            </div>
        </div>
    );
};

export default IncomeOverview;