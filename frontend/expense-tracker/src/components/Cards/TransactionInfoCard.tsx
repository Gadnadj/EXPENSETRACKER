import { useContext } from 'react';
import { LuUtensils, LuTrash2, LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    title: string;
    icon?: string;
    date: string;
    amount: number;
    type: 'income' | 'expense';
    hideDeleteBtn?: boolean;
    onDelete?: () => void;
}

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    const getAmountStyles = () => {
        if (type === 'income') {
            return isDarkMode 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-green-50 text-green-500';
        }
        return isDarkMode 
            ? 'bg-red-900/30 text-red-400' 
            : 'bg-red-50 text-red-500';
    };

    return (
        <div className={`group relative flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode 
                ? 'hover:bg-gray-700/50' 
                : 'hover:bg-gray-100/60'
        }`}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${
                isDarkMode 
                    ? 'bg-gray-800 text-gray-200' 
                    : 'bg-gray-100 text-gray-800'
            }`}>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LuUtensils className='w-6 h-6' />
                )}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                        {title}
                    </p>
                    <p className={`text-xs mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                        {date}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    {hideDeleteBtn && (
                        <button 
                            className={`md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 cursor-pointer ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-red-400' 
                                    : 'text-gray-400 hover:text-red-500'
                            }`} 
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md min-w-[110px] w-auto transition-colors duration-300 ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium whitespace-nowrap'>
                            {type === 'income' ? '+' : '-'} ${amount}
                        </h6>
                        {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;