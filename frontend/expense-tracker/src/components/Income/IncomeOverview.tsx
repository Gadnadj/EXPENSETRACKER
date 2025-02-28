import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { useEffect, useState } from 'react';
import { Income } from '../../utils/types';
import { prepareIncomeBarChartdata } from '../../utils/helper';

type Props = {
    transactions: Income[];
    onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: Props) => {

    const [chartData, setChartData] = useState<{ month: string; amount: number; source: string; }[]>([]);

    useEffect(() => {
        const result = prepareIncomeBarChartdata(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div>

        </div>
    );
};

export default IncomeOverview;