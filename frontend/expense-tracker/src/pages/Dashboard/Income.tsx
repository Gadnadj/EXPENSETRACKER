import { useEffect, useState, useRef, useContext } from 'react';
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
import Loading from '../../components/Loading';
import { ThemeContext } from '../../context/ThemeContext';
import gsap from 'gsap';

const Income = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [incomeData, setIncomeData] = useState<Income[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean, data: string | null }>({
        show: false,
        data: null
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Refs pour les animations
    const overviewRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

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
            toast.error('Failed to add income. Please try again.');
        }
    };

    const deleteIncome = async (id: string) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success('Income details deleted successfully.');
            fetchIncomeDetails();
        } catch (error) {
            console.error('Error deleting income: ', error);
            toast.error('Failed to delete income');
        }
    };

    const handleDownloadIncome = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Income details downloaded successfully.');
        } catch (error) {
            console.error('Error downloading income details: ', error);
            toast.error('Failed to download income details. Please try again.');
        }
    };

    const fetchIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error('Error fetching income details: ', error);
            toast.error('Failed to fetch income details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    // Animations GSAP
    useEffect(() => {
        if (!loading) {
            // Animation de l'aperçu
            gsap.fromTo(
                overviewRef.current,
                {
                    y: -50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                }
            );

            // Animation de la liste
            gsap.fromTo(
                listRef.current,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    delay: 0.3
                }
            );
        }
    }, [loading]);

    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                <Loading />
            </div>
        );
    }

    return (
        <DashboardLayout activeMenu='Income'>
            <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 gap-6'>
                    <div ref={overviewRef}>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <div ref={listRef}>
                        <IncomeList
                            transactions={incomeData}
                            onDelete={(id: string) => { setOpenDeleteAlert({ show: true, data: id }); }}
                            onDownload={handleDownloadIncome}
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