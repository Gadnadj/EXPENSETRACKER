import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    data: { category: string, amount: number }[] | { month: string; amount: number; source: string; }[]
}

const CustomBarChart = ({ data }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const getBarColor = (index: number) => {
        if (isDarkMode) {
            return index % 2 === 0 ? '#7c3aed' : '#9333ea';
        }
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    };

    const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
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
                        {payload[0].payload.category || payload[0].payload.source}
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
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                        vertical={false} 
                    />
                    <XAxis 
                        dataKey='category' 
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
                        cursor={false}
                    />
                    <Bar 
                        dataKey='amount'
                        radius={[4, 4, 0, 0]}
                    >
                        {data.map((_, index) => (
                            <Cell 
                                key={index} 
                                fill={getBarColor(index)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;