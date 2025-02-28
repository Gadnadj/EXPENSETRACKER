import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

type Props = {
    title: string;
    icon: string;
    date: string;
    amount: number;
    type: string | undefined;
    hideDeleteBtn?: boolean;
    onDelete?: () => void
}

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }: Props) => {

    const getAmountStyles = () => {
        if (type === 'income') {
            return 'bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400';
        }
        return 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400';
    };

    return (
        <div className='group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-700/50 transition-colors duration-300'>
            <div className='w-12 h-12 flex items-center justify-center text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors duration-300'>
                {icon ? (
                    <img src={icon} alt={icon} className='w-6 h-6' />
                ) : (
                    <LuUtensils className='w-6 h-6' />
                )
                }
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className='text-sm text-gray-700 dark:text-gray-200 font-medium transition-colors duration-300'>
                        {title}
                    </p>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-1 transition-colors duration-300'>
                        {date}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    {hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer' onClick={onDelete}>
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md w-[110px] transition-colors duration-300 ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium'>
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