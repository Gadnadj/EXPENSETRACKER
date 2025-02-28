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

    const axisColor = isDarkMode ? '#9ca3af' : '#555'; // gray-400 for dark mode, original color for light mode

    const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-gray-600 transition-colors duration-300'>
                    <p className='text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1 transition-colors duration-300'>
                        {payload[0].payload.category}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300'>
                        Amount: <span className='text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300'>${payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };
    return (
        <div className='bg-white dark:bg-gray-800 mt-6 transition-colors duration-300'>
            <ResponsiveContainer
                width='100%'
                height={300}
            >
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />

                    <XAxis 
                        dataKey='month' 
                        tick={{ fontSize: 12, fill: axisColor }} 
                        stroke='none'
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: axisColor }} 
                        stroke='none'
                    />
                    <Tooltip content={CustomTooltip} />

                    <Bar
                        dataKey='amount'
                        fill='#FF8042'
                    // radius={[10, 10, 0, 0]}
                    // activeDot={{ r: 8, fill: 'yellow' }}
                    // activeStyle={{ fill: 'green' }}
                    >
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