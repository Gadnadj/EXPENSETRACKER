import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    data: { category: string, amount: number }[] | { month: string; amount: number; source: string; }[]
}

const CustomBarChart = ({ data }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const getBarColor = (index: number) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    };

    const axisColor = isDarkMode ? '#9ca3af' : '#555';

    const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`shadow-md rounded-lg p-2 border transition-colors duration-300 ${
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
        return null;
    };

    return (
        <div className={`transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />
                    <XAxis 
                        dataKey='category' 
                        tick={{ fontSize: 12, fill: axisColor }} 
                        stroke='none'
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: axisColor }} 
                        stroke='none'
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey='amount'>
                        {data.map((_, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;