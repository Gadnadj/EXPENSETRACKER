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
            <Navbar activeMenu={activeMenu} />
            {user && (
                <main className='flex mt-24 md:mt-[73px]'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className='grow mx-5'>
                        {children}
                    </div>
                </main>
            )}
        </div>
    );
};

export default DashboardLayout;