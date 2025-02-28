import CustomPieChart from '../Charts/CustomPieChart';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

const COLORS = ['#875CF5', '#FA2C37', '#FF6900'];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const balanceData = [
        { name: 'Total Balance', amount: totalBalance },
        { name: 'Total Expense', amount: totalExpense },
        { name: 'Total Income', amount: totalIncome }
    ];

    return (
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className='flex items-center justify-between'>
                <h5 className={`text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Financial Overview
                </h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label='Total Balance'
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;