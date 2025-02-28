import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import type { Income } from '../../utils/types';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';


const Income = () => {

    const [incomeData, setIncomeData] = useState<Income[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean, data: string | null }>({
        show: false,
        data: null
    });
    0;
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    //Get All Income Details


    const handleAddIncome = async (income: Income) => {
        const { source, amount, date, icon } = income;
        if (!source.trim()) {
            toast.error('Source is required.');
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('Amount should be a valid number greater than 0.');
            return;
        }

        if (!date) {
            toast.error('Date is required.');
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source, amount, date, icon
            });

            setOpenAddIncomeModal(false);
            toast.success('Income added successfully.');
            fetchIncomeDetails();
        } catch (error) {
            console.error('Error adding income: ', error);
        }
    };

    const deleteIncome = async (id: string) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success('Income details deleted successfully.');
            fetchIncomeDetails();
        } catch (error) {
            console.log('Error deleting income: ', error);
            toast.error('Failed to delete income');
        }
    };

    const handleDownloadIncome = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob'
            });

            //Create URl for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Error downloading income details: ', error);
            toast.error('Failed to download income details. Please try again.');
        }
    };

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

    useEffect(() => {

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

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id: string) => { setOpenDeleteAlert({ show: true, data: id }); }}
                        onDownload={handleDownloadIncome}
                    />

                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title='Add Income'
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title='Delete Income'
                >
                    <DeleteAlert
                        content='Are you sure you want to delete this income detail?'
                        onDelete={() => deleteIncome(openDeleteAlert.data ?? '')}
                    />
                </Modal>

            </div>
        </DashboardLayout>
    );
};

export default Income;