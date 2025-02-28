import { useEffect, useState } from 'react';
import { Expense } from '../../utils/types';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

type Props = {
    data: Expense[] | undefined
}

const Last30DaysExpenses = ({ data }: Props) => {

    const [charData, setChartData] = useState<{ category: string; amount: number; }[]>([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result ?? []);

        return () => { };
    }, [data]);

    console.log(charData);


    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                    Last 30 Days Expenses
                </h5>
            </div>

            <CustomBarChart
                data={charData}
            />

        </div>
    );
};

export default Last30DaysExpenses;