import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

type Props = {
    data: Array<{ name: string; amount: number }>;
    label: string;
    totalAmount: string;
    colors: string[];
    showTextAnchor: boolean;
}

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }: Props) => {
    return (
        <div className="relative">
            <ResponsiveContainer width='100%' height={380}>
                <PieChart className="relative z-20">
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
                        content={CustomTooltip}
                        wrapperStyle={{ zIndex: 30 }} 
                    />
                    <Legend content={CustomLegend} />
                </PieChart>
            </ResponsiveContainer>

            {showTextAnchor && (
                <div className="absolute flex flex-col items-center justify-center top-[175px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 mb-1">{label}</p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">{totalAmount}</p>
                </div>
            )}
        </div>
    );
};

export default CustomPieChart;