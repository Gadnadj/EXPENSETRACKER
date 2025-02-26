import React, { ReactNode } from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';

type Props = {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className='flex'>
            <div className="w-screen h-screen xl:w-[90vh] md:w-[60vh] px-12 pt-8 pb-12">
                <h2 className="text-lg font-medium text-black">
                    Expense Tracker
                </h2>
                {children}
            </div>

            <div className="hidden md:block flex-1 h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

                <div className="grid grid-cols-1 relative">
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50"></div>
                        <StatsInfoCard
                            icon={<LuTrendingUpDown className="relative z-50" />}
                            label='Track Your Income & Expenses'
                            value='430,000'
                            color='bg-violet-600' />
                    </div>
                </div>

                <img className='w-64 md:w-[90%] xl:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15' src={CARD_2} />
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
    return (
        <div className='flex gap-6 p-4 relative z-40'>
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full relative z-50`}>
                {icon}
            </div>

            <div className="relative z-40">
                <h6 className='text-xs text-gray-500 mb-1'>
                    {label}
                </h6>

                <span className='text-[20px]'>${value}</span>
            </div>
        </div>
    );
};