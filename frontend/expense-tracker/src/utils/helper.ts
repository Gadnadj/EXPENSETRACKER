import moment from 'moment';
import { Expense, Income } from './types';

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getInitials = (fullName: string) => {
    if (!fullName) return '';

    const words = fullName.split(' ');
    let initials = '';

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num: number) => {
    if (num === null || isNaN(num)) return '';

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data: Expense[] | undefined) => {
    if (!data || !Array.isArray(data)) {
        return [];
    }

    const chartData = data.map((item) => ({
        category: item?.category || 'Unknown',
        amount: item?.amount || 0
    }));

    return chartData;
};

export const prepareIncomeBarChartdata = (data: Income[] | undefined) => {
    const sortedData: Income[] = [...(data ?? [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source
    }));
    return chartData;
};

export const prepareExpenseLineChartData = (data: Expense[] | undefined) => {
    const sortedData: Expense[] = [...(data ?? [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category
    }));
    return chartData;
};