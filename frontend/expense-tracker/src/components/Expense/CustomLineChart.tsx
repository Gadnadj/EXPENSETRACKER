import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    data: { month: string; amount: number; category: string; }[]
}

interface CustomTooltipProps {
    active?: boolean,
    payload?: any[];
    label?: string;
}

const CustomLineChart = ({ data }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            return (
                <div className={`bg-white shadow-md rounded-lg p-2 border transition-colors duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-300'
                }`}>
                    <p className={`text-xs font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-800'
                    }`}>
                        {payload[0].payload.category}
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Amount: <span className={`text-sm font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>${payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
    };

    return (
        <div className={`transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
            <ResponsiveContainer
                width='100%'
                height={300}
            >
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor='#875cf5' opacity={0.4} />
                            <stop offset='95%' stopColor='#875cf5' opacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke='none' />
                    <XAxis 
                        dataKey='month' 
                        tick={{ 
                            fontSize: 12, 
                            fill: isDarkMode ? '#9CA3AF' : '#6B7280'
                        }} 
                        stroke='none'
                    />
                    <YAxis 
                        tick={{ 
                            fontSize: 12, 
                            fill: isDarkMode ? '#9CA3AF' : '#6B7280'
                        }} 
                        stroke='none'
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Area 
                        type='monotone' 
                        dataKey='amount' 
                        stroke='#875cf5' 
                        fill='url(#incomeGradient)' 
                        strokeWidth={3} 
                        dot={{ r: 3, fill: '#ab8df8' }} 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;