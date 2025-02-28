import React, { useState, useContext } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    value: string;
    onChange: (target: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder: string;
    type: string;
}

const Input = ({ value, onChange, label, placeholder, type }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
                {label}
            </label>

            <div className={`relative rounded-lg border transition-all duration-300 ${
                isDarkMode 
                    ? 'bg-gray-700 border-gray-600 focus-within:border-violet-500 shadow-sm shadow-gray-800/10' 
                    : 'bg-white border-gray-300 focus-within:border-violet-500 shadow-sm'
            }`}>
                <input 
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className={`block w-full px-4 py-2.5 text-sm rounded-lg outline-none transition-colors duration-300 ${
                        isDarkMode 
                            ? 'text-white placeholder-gray-400 bg-transparent' 
                            : 'text-gray-900 placeholder-gray-500 bg-transparent'
                    } ${
                        type === 'date' && isDarkMode 
                            ? '[color-scheme:dark]' 
                            : ''
                    } ${
                        type === 'number' 
                            ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                            : ''
                    }`}
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === 'password' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {showPassword ? (
                            <FaRegEye
                                size={18}
                                className={`cursor-pointer transition-colors duration-300 ${
                                    isDarkMode ? 'text-gray-300 hover:text-violet-400' : 'text-gray-500 hover:text-violet-500'
                                }`}
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={18}
                                className={`cursor-pointer transition-colors duration-300 ${
                                    isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-400 hover:text-violet-500'
                                }`}
                                onClick={toggleShowPassword}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;