import { ReactNode, useContext } from 'react';
import { useUser } from '../../hooks/useUser';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    children: ReactNode;
    activeMenu: string;
}

const DashboardLayout = ({ children, activeMenu }: Props) => {
    const { user } = useUser();
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className="fixed top-0 left-0 right-0 z-50 safe-top">
                <Navbar activeMenu={activeMenu} />
            </div>
            {user && (
                <div className='flex pt-[73px] safe-top'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className='grow mx-5'>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;