import { useContext } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg transform active:scale-95 transition-all duration-300 ${
                isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
            }`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className="relative w-5 h-5">
                <LuSun
                    className={`absolute w-full h-full text-yellow-500 transition-all duration-300 ${
                        isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`}
                />
                <LuMoon
                    className={`absolute w-full h-full text-gray-700 transition-all duration-300 ${
                        !isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                    }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle; 