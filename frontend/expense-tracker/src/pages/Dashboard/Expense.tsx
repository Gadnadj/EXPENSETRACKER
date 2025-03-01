import { useEffect, useState, useRef, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import type { Expense } from '../../utils/types';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import Loading from '../../components/Loading';
import { ThemeContext } from '../../context/ThemeContext';
import gsap from 'gsap';

const Expense = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [expenseData, setExpenseData] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean, data: string | null }>({
        show: false,
        data: null
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    // Refs pour les animations
    const overviewRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const fetchExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong. Please try again.', error);
            toast.error('Failed to fetch expense details');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadExpense = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob'
            });

            //Create URl for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Error downloading expense details: ', error);
            toast.error('Failed to download expense details. Please try again.');
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success('Expense details deleted successfully.');
            fetchExpenseDetails();
        } catch (error) {
            console.log('Error deleting expense: ', error);
            toast.error('Failed to delete expense');
        }
    };


    const handleAddExpense = async (expense: Expense) => {
        const { category, amount, date, icon } = expense;
        if (!category.trim()) {
            toast.error('Category is required.');
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
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category, amount, date, icon
            });

            setOpenAddExpenseModal(false);
            toast.success('Expense added successfully.');
            fetchExpenseDetails();
        } catch (error) {
            console.error('Error adding expense: ', error);
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        return () => { };
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
            <div className={`flex items-center justify-center h-screen transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <Loading />
            </div>
        );
    }

    return (
        <DashboardLayout activeMenu='Expense'>
            <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 gap-6'>
                    <div ref={overviewRef}>
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <div ref={listRef}>
                        <ExpenseList
                            transactions={expenseData}
                            onDelete={(id: string) => {
                                setOpenDeleteAlert({ show: true, data: id });
                            }}
                            onDownload={handleDownloadExpense}
                        />
                    </div>
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title='Add Expense'
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title='Delete Expense'
                >
                    <DeleteAlert
                        content='Are you sure you want to delete this expense detail?'
                        onDelete={() => deleteExpense(openDeleteAlert.data ?? '')}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Expense;