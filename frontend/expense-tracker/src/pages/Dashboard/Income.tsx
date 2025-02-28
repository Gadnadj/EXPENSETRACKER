import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import type { Income } from '../../utils/types';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

type Props = {}

const Income = (props: Props) => {

    const [incomeData, setIncomeData] = useState<Income[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean, data: null }>({
        show: false,
        data: null
    });
    0;
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    //Get All Income Details


    const handleAddIncome = async (income: Income) => { };

    const deleteIncome = async (id: string) => { };

    const handleDownloadIncome = async () => { };

    useEffect(() => {
        const fetchIncomeDetails = async () => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
                if (response.data) {
                    setIncomeData(response.data);
                }
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            } finally {
                setLoading(false);
            }
        };
        fetchIncomeDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DashboardLayout activeMenu='Income'>
            <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title='Add Income'
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>

            </div>
        </DashboardLayout>
    );
};

export default Income;