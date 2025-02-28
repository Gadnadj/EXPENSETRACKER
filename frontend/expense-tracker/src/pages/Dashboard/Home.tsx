import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { DashboardTypes } from '../../utils/types';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState<DashboardTypes | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashBoardData = async () => {
            try {
                const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
                if (response.data) {
                    console.log('Dashboard data:', response.data);
                    setDashboardData(response.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                toast.error('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashBoardData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <DashboardLayout activeMenu='Dashboard'>
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<LuWalletMinimal className='text-2xl' />}
                        label='Total Income'
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color='bg-green-500'
                    />
                    <InfoCard
                        icon={<LuHandCoins className='text-2xl' />}
                        label='Total Expense'
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color='bg-red-500'
                    />
                    <InfoCard
                        icon={<IoMdCard className='text-2xl' />}
                        label='Balance'
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color='bg-purple-500'
                    />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.transactions || []}
                    />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore={() => navigate('/income')}
                    />

                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore={() => navigate('/expense')}
                    />
                </div>

                <div className='mt-6'>
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate('/transactions')}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;