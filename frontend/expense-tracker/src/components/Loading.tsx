import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Loading = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-900 bg-opacity-90' 
                : 'bg-white bg-opacity-80'
        }`}>
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-500"></div>
                <p className={`mt-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    Chargement en cours...
                </p>
            </div>
        </div>
    );
};

export default Loading; 