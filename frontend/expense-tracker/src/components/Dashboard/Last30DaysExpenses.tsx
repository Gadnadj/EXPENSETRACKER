import { useEffect, useState } from 'react';
import { Expense } from '../../utils/types';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

type Props = {
    data: Expense[] | undefined
}

const Last30DaysExpenses = ({ data }: Props) => {
    const [chartData, setChartData] = useState<{ category: string; amount: number; }[]>([]);

    useEffect(() => {
        if (!data) {
            setChartData([]);
            return;
        }

        const result = prepareExpenseBarChartData(data);
        setChartData(result);
    }, [data]);

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-gray-900 dark:text-white transition-colors duration-300'>
                    Last 30 Days Expenses
                </h5>
            </div>

            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    No expense data available
                </div>
            )}
        </div>
    );
};

export default Last30DaysExpenses;