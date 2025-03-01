import { useContext, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { LuSun, LuMoon } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext';

const isPWA = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone;

type Props = {
    activeMenu: string;
}

const Navbar = ({ activeMenu }: Props) => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <nav className={`flex items-center justify-between backdrop-blur-[2px] py-4 md:py-4 ${isPWA ? 'h-[96px] mt-[40px]' : 'h-24 md:h-[73px]'} px-7 fixed w-full top-0 left-0 right-0 z-[9999] transition-all duration-300 border-b ${
            isDarkMode 
                ? 'bg-gray-800/100 border-gray-700' 
                : 'bg-white/100 border-gray-200/50'
        }`} style={{ WebkitTransform: 'translate3d(0,0,0)' }}>
            <div className="flex items-center gap-5">
                <button
                    className={`block lg:hidden transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                    onClick={() => setOpenSideMenu(!openSideMenu)}>
                    {
                        openSideMenu ? (
                            <HiOutlineX className='text-3xl md:text-2xl' />
                        ) : (
                            <HiOutlineMenu className='text-3xl md:text-2xl' />
                        )
                    }
                </button>

                <h2 className={`text-xl md:text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Expense Tracker
                </h2>
            </div>

            <button
                onClick={toggleTheme}
                className={`relative p-2 rounded-lg transform active:scale-95 transition-all duration-300 ${
                    isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <div className="relative w-6 h-6 md:w-5 md:h-5">
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
                <div className={`fixed ${isPWA ? 'top-[96px]' : 'top-24 md:top-[73px]'} left-0 right-0 bottom-0 lg:hidden transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;