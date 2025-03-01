import { createContext, ReactNode, useState, useEffect } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface Props {
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: true,
    toggleTheme: () => { }
});

export const ThemeProvider = ({ children }: Props) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}; 