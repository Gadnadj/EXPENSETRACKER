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
        return type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';
    };

    return (
        <div className='group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60'>
            <div className='w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    <img src={icon} alt={icon} className='w-6 h-6' />
                ) : (
                    <LuUtensils className='w-6 h-6' />
                )
                }
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className='text-sm text-gray-700 font-medium'>
                        {title}
                    </p>
                    <p className='text-xs text-gray-400 mt-1'>
                        {date}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    {hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}>
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md w-[110px] ${getAmountStyles()}`}>
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