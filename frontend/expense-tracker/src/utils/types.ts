export interface User {
    _id?: string;
    fullName: string;
    email: string;
    password: string;
    profileImageUrl?: string;
}

export interface Expense {
    _id?: string;
    userId?: string;
    icon?: string;
    category: string;
    amount: number;
    date: Date;
    type?: string;
}

export interface Income {
    _id?: string;
    userId?: string;
    icon?: string;
    source: string;
    amount: number;
    date: Date;
    type?: string;
}

export interface DashboardTypes {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    last30DaysExpenses: {
        total: number;
        transactions: Expense
    };
    last60DaysIncome: {
        total: number;
        transactions: Income
    };
    recentTransactions: Expense[] | Income[];
}