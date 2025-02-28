import { useEffect, useState } from 'react';
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


const Expense = () => {

    const [expenseData, setExpenseData] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean, data: string | null }>({
        show: false,
        data: null
    });
    0;
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong. Please try again.', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadExpense = async () => { };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DashboardLayout activeMenu='Expense'>
            <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 gap-6'>
                    <div>
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id: string) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpense}
                    />

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