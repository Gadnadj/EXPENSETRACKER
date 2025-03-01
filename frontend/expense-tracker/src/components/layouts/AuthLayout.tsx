import React, { ReactNode, useContext } from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle';

type Props = {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className='flex min-h-screen overflow-y-hidden'>
            <div className={`w-full md:w-[60vh] xl:w-[90vh] px-4 sm:px-8 md:px-12 py-6 md:py-8 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}>
                <div className="flex items-center justify-between mb-4 md:mb-8">
                    <h2 className={`text-lg font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                        Expense Tracker <span className="hidden sm:inline">🚀</span>
                    </h2>
                    <ThemeToggle />
                </div>
                <div className="h-full flex flex-col justify-center">
                    {children}
                </div>
            </div>

            <div className={`hidden md:block flex-1 h-screen bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-violet-50 bg-auth-bg-img'
            }`}>
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

                <div className="grid grid-cols-1 relative">
                    <div className="relative">
                        <div className={`absolute top-0 left-0 w-full h-full rounded-xl shadow-md shadow-purple-400/10 border transition-colors duration-300 ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600' 
                                : 'bg-white border-gray-200/50'
                        }`}></div>
                        <StatsInfoCard
                            icon={<LuTrendingUpDown className="relative z-50" />}
                            label='Track Your Income & Expenses'
                            value='430,000'
                            color='bg-violet-600' />
                    </div>
                </div>

                <img className='w-64 md:w-[90%] xl:w-[50%] absolute bottom-10 shadow-lg shadow-blue-400/15' src={CARD_2} />
            </div>
        </div>
    );
};

export default AuthLayout;

interface StatsInfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}

const StatsInfoCard = ({ icon, label, value, color }: StatsInfoCardProps) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className='flex gap-6 p-4 relative z-40'>
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full relative z-50`}>
                {icon}
            </div>

            <div className="relative z-40">
                <h6 className={`text-xs mb-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    {label}
                </h6>

                <span className={`text-[20px] transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>${value}</span>
            </div>
        </div>
    );
};