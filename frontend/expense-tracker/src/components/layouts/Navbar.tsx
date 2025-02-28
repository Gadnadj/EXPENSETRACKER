import React, { useContext, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { LuSun, LuMoon } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    activeMenu: string;
}

const Navbar = ({ activeMenu }: Props) => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className='flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 transition-all duration-300'>
            <div className="flex items-center gap-5">
                <button
                    className='block lg:hidden text-gray-700 dark:text-gray-200'
                    onClick={() => setOpenSideMenu(!openSideMenu)}>
                    {
                        openSideMenu ? (
                            <HiOutlineX className='text-2xl' />
                        ) : (
                            <HiOutlineMenu className='text-2xl' />
                        )
                    }
                </button>

                <h2 className='text-lg font-medium text-gray-900 dark:text-white'>
                    Expense Tracker
                </h2>
            </div>

            <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform active:scale-95"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                <div className="relative w-5 h-5">
                    <LuSun 
                        className={`absolute w-full h-full text-yellow-500 transition-all duration-300 ${
                            isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                        }`} 
                    />
                    <LuMoon 
                        className={`absolute w-full h-full text-gray-700 transition-all duration-300 ${
                            !isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                        }`} 
                    />
                </div>
            </button>

            {openSideMenu && (
                <div className='fixed top-[61px] left-0 right-0 bottom-0 bg-white dark:bg-gray-800 lg:hidden transition-all duration-300'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;