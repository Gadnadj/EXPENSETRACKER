import { useEffect, useState } from 'react';
import { Income } from '../../utils/types';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

type Props = {
    data: Income[] | undefined
    totalIncome: number;
}

const RecentIncomeWithChart = ({ data, totalIncome }: Props) => {

    const [chartData, setChartData] = useState<{ name: string; amount: number; }[]>([]);

    useEffect(() => {
        const prepareChartData = () => {
            const dataArr = data?.map((item) => ({
                name: item?.source,
                amount: item?.amount
            }));
            setChartData(dataArr ?? []);
        };

        prepareChartData();

        return () => { };
    }, [data]);

    console.log(chartData);


    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                    Last 60 Days Income
                </h5>
            </div>

            <CustomPieChart
                data={chartData}
                label='Total Income'
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    );
};

export default RecentIncomeWithChart;