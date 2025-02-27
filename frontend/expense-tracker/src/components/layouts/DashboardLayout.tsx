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
    console.log(user);

    return (
        <div className=''>
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