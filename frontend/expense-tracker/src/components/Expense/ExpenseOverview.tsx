import { useEffect, useState, useContext } from 'react';
import { Expense } from '../../utils/types';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from './CustomLineChart';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    transactions: Expense[];
    onExpenseIncome: () => void;
}

const ExpenseOverview = ({ transactions, onExpenseIncome }: Props) => {
    const [chartData, setChartData] = useState<{ month: string; amount: number; category: string; }[]>([]);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
        return () => { };
    }, [transactions]);

    return (
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h5 className={`text-lg font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Expense Overview
                    </h5>
                    <p className={`text-sm mt-1.5 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        Track your expenses over time
                    </p>
                </div>

                <button 
                    className={`flex items-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                        isDarkMode 
                            ? 'text-purple-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-700' 
                            : 'text-purple-600 hover:text-gray-700 bg-purple-50 hover:bg-gray-50 border-purple-100'
                    }`} 
                    onClick={onExpenseIncome}
                >
                    <LuPlus className='text-base transition-transform duration-300 group-hover:rotate-90' />
                    <span>Add Expense</span>
                </button>
            </div>

            <div className='mt-8'>
                {chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
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

export default ExpenseOverview;