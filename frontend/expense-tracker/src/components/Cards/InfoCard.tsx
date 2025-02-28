import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}

const InfoCard = ({ icon, label, value, color }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`flex gap-6 p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700 shadow-none' 
                : 'bg-white shadow-gray-100 border-gray-200/50'
        }`}>
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>

            <div>
                <h6 className={`text-sm mb-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    {label}
                </h6>
                <span className={`text-[22px] transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    ${value}
                </span>
            </div>
        </div>
    );
};

export default InfoCard;