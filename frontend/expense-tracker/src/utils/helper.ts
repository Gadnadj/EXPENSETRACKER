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