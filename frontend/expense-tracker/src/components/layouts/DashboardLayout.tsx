import { ReactNode } from 'react';
import { useUser } from '../../hooks/useUser';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

type Props = {
    children: ReactNode;
    activeMenu: string;
}

const DashboardLayout = ({ children, activeMenu }: Props) => {
    const { user } = useUser();

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
            <Navbar activeMenu={activeMenu} />
            {
                user && (
                    <div className='flex'>
                        <div className='max-[1080px]:hidden'>
                            <SideMenu activeMenu={activeMenu} />
                        </div>

                        <div className='grow mx-5'>
                            {children}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DashboardLayout;