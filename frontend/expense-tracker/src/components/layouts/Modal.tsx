import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    children: ReactNode
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const Modal = ({ children, isOpen, onClose, title }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                {/* Modal Content */}
                <div className={`relative rounded-lg shadow-sm transition-colors duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white'
                }`}>
                    {/* Modal Header */}
                    <div className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t transition-colors duration-300 ${
                        isDarkMode 
                            ? 'border-gray-700' 
                            : 'border-gray-200'
                    }`}>
                        <h3 className={`text-lg font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {title}
                        </h3>

                        <button 
                            type='button' 
                            className={`text-sm w-9 h-8 inline-flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                                    : 'text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                            }`} 
                            onClick={onClose}
                        >
                            X
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className='p-4 md:p-5 space-y-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;