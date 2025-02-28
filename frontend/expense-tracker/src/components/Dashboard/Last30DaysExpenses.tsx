import { useContext, useEffect, useState } from 'react';
import { Expense } from '../../utils/types';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    data: Expense[];
}

const Last30DaysExpenses = ({ data }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [chartData, setChartData] = useState<{ category: string; amount: number; }[]>([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return () => { };
    }, [data]);

    return (
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className={`text-lg font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Last 30 Days Expenses
                    </h5>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        Track your spending trends over the past month
                    </p>
                </div>
            </div>

            <div className='mt-8'>
                {chartData.length > 0 ? (
                    <CustomBarChart data={chartData} />
                ) : (
                    <div className={`flex items-center justify-center h-64 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        No expense data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default Last30DaysExpenses;