import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
    content: string;
    onDelete: () => void;
}

const DeleteAlert = ({ content, onDelete }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div>
            <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
                {content}
            </p>

            <div className='flex justify-end mt-6'>
                <button 
                    type='button' 
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                        isDarkMode 
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`} 
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;