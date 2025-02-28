import EmojiPicker from 'emoji-picker-react';
import { useState, useContext } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
    icon: string;
    onSelect: (selectedIcon: string) => void;
}

const EmojiPickerPopup = ({ icon, onSelect }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    const handleEmojiSelect = (emoji: any) => {
        onSelect(emoji?.imageUrl || '');
        setIsOpen(false);
    };

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div 
                className={`flex items-center gap-4 cursor-pointer transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`} 
                onClick={() => setIsOpen(true)}
            >
                <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-700 text-violet-400' 
                        : 'bg-purple-50 text-purple-700'
                }`}>
                    {icon ? (
                        <img src={icon} alt={icon} className='w-8 h-8' />
                    ) : (
                        <LuImage />
                    )}
                </div>

                <p className="text-sm">{icon ? 'Change Icon' : 'Pick Icon'}</p>
            </div>

            {isOpen && (
                <div className='relative'>
                    <button 
                        className={`w-7 h-7 flex items-center justify-center rounded-full absolute -top-2 -right-2 z-10 cursor-pointer transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`} 
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className="w-4 h-4" />
                    </button>

                    <div className={`${isDarkMode ? '[&_.EmojiPickerReact]:bg-gray-800 [&_.EmojiPickerReact]:border-gray-700' : ''}`}>
                        <EmojiPicker
                            open={isOpen}
                            onEmojiClick={handleEmojiSelect}
                            theme={isDarkMode ? 'dark' : 'light'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;