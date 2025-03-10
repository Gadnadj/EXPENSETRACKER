import React, { useRef, useState, useContext } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    image: File | null;
    setImage: (value: File | null) => void;
}

const ProfilePhotoSelector = ({ image, setImage }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { isDarkMode } = useContext(ThemeContext);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            //Update the image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className={`w-20 h-20 flex items-center justify-center rounded-full relative transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-purple-100'
                }`}>
                    <LuUser className={`text-4xl transition-colors duration-300 ${
                        isDarkMode ? 'text-violet-400' : 'text-primary'
                    }`} />
                    <button
                        type='button'
                        className={`w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-1 -right-1 transition-colors duration-300 ${
                            isDarkMode ? 'bg-violet-500 hover:bg-violet-600' : 'bg-[#875cf5] hover:bg-violet-600'
                        }`}
                        onClick={onChooseFile}>
                        <LuUpload className='cursor-pointer'/>
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={previewUrl || undefined} alt="profile photo" className='w-20 h-20 rounded-full object-cover' />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 transition-colors duration-300'
                        onClick={handleRemoveImage}>
                        <LuTrash className='cursor-pointer'/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;