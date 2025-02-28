type Props = {
    active?: boolean;
    payload?: any;
}

const CustomTooltip = ({ active, payload }: Props) => {

    if (active && payload && payload.length) {
        console.log(active);
        console.log(payload);

        return (
            <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-gray-600 transition-colors duration-300'>
                <p className='text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1 transition-colors duration-300'>{payload[0].name}</p>
                <p className='text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300'>Amount:{' '}
                    <span className='text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300'>
                        ${payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;