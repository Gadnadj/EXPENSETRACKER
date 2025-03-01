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
                <div className={`p-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-gray-900/20' 
                        : 'bg-white/90 border-gray-200 shadow-gray-200/20'
                }`}>
                    <p className={`text-xs font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-violet-400' : 'text-violet-600'
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
        return null;
    };

    return (
        <div className={`w-full h-full p-4 rounded-xl transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id='expenseGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop 
                                offset='5%' 
                                stopColor={isDarkMode ? '#7c3aed' : '#875cf5'} 
                                stopOpacity={0.3} 
                            />
                            <stop 
                                offset='95%' 
                                stopColor={isDarkMode ? '#7c3aed' : '#875cf5'} 
                                stopOpacity={0} 
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                        vertical={false} 
                    />

                    <XAxis 
                        dataKey='month' 
                        tick={{ 
                            fontSize: 12, 
                            fill: isDarkMode ? '#9CA3AF' : '#6B7280'
                        }} 
                        stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />

                    <YAxis 
                        tick={{ 
                            fontSize: 12, 
                            fill: isDarkMode ? '#9CA3AF' : '#6B7280'
                        }} 
                        stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                    />

                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{stroke: isDarkMode ? '#4B5563' : '#E5E7Eb'}}
                    />

                    <Area 
                        type='monotone' 
                        dataKey='amount' 
                        stroke={isDarkMode ? '#7c3aed' : '#875cf5'} 
                        strokeWidth={2}
                        fill='url(#expenseGradient)' 
                        dot={{ 
                            r: 4, 
                            fill: isDarkMode ? '#7c3aed' : '#875cf5',
                            strokeWidth: 2,
                            stroke: isDarkMode ? '#1F2937' : '#FFFFFF'
                        }}
                        activeDot={{
                            r: 6,
                            fill: isDarkMode ? '#7c3aed' : '#875cf5',
                            strokeWidth: 2,
                            stroke: isDarkMode ? '#1F2937' : '#FFFFFF'
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;