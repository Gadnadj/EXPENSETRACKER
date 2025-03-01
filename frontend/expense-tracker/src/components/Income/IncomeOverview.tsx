import { useContext, useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { Income } from '../../utils/types';
import { prepareIncomeBarChartdata } from '../../utils/helper';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    transactions: Income[];
    onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [chartData, setChartData] = useState<{ month: string; amount: number; source: string; }[]>([]);

    useEffect(() => {
        const result = prepareIncomeBarChartdata(transactions);
        setChartData(result);
        return () => { };
    }, [transactions]);

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
                        Income Overview
                    </h5>
                    <p className={`text-xs mt-0.5 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>

                <button 
                    className={`flex items-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                        isDarkMode 
                            ? 'text-purple-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-700' 
                            : 'text-purple-600 hover:text-gray-700 bg-purple-50 hover:bg-gray-50 border-purple-100'
                    }`} 
                    onClick={onAddIncome}
                >
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className='mt-10'>
                {chartData.length > 0 ? (
                    <CustomBarChart data={chartData} />
                ) : (
                    <div className={`flex items-center justify-center h-[300px] transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        No income data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomeOverview;