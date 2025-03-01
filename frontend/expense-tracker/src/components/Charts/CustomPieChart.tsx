import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './charts.css';

type Props = {
    data: Array<{ name: string; amount: number }>;
    label: string;
    totalAmount: string;
    colors: string[];
    showTextAnchor: boolean;
}

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`p-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 z-50 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-gray-900/20' 
                        : 'bg-white/90 border-gray-200 shadow-gray-200/20'
                }`}>
                    <p className={`text-xs font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-violet-400' : 'text-violet-600'
                    }`}>
                        {payload[0].payload.name}
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

    const CustomLegend = ({ payload }: { payload?: any[] }) => {
        if (!payload) return null;
        return (
            <div className='flex flex-wrap justify-center gap-4 mt-4'>
                {payload.map((entry, index) => (
                    <div key={`legend-${index}`} className='flex items-center gap-2'>
                        <div 
                            className='w-3 h-3 rounded-full'
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`relative transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
            <ResponsiveContainer width='100%' height={380}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='amount'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        content={<CustomTooltip />}
                        wrapperStyle={{ 
                            zIndex: 100,
                            touchAction: 'none'
                        }}
                        allowEscapeViewBox={{ x: true, y: true }}
                        position={{ y: -50 }}
                        cursor={{ fill: 'none' }}
                    />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>

            {showTextAnchor && (
                <div className='absolute flex flex-col items-center justify-center top-[175px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none'>
                    <p className={`text-sm mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {label}
                    </p>
                    <p className={`text-2xl font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                        {totalAmount}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomPieChart;