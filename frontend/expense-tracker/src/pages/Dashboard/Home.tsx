import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { DashboardTypes } from '../../utils/types';

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState<DashboardTypes | null>(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchDashBoardData = async () => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

                if (response.data) {
                    setDashboardData(response.data);
                }
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDashBoardData();
        return () => { };
    }, []);



    return (
        <DashboardLayout activeMenu='Dashboard'>
            <div className="my-5 mx-auto">
                Home
            </div>
        </DashboardLayout>
    );
};

export default Home;