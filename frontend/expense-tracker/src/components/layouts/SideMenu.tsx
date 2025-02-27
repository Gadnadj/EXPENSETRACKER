import React from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

type Props = {
    activeMenu: string;
}

const SideMenu = ({ activeMenu }: Props) => {

    const { user, clearUser } = useUser();

    const navigate = useNavigate();

    const handleClick = (route: string) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        clearUser();
        navigate('/login');
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-2'>
                {
                    user?.profileImageUrl ? (
                        <img src={user.profileImageUrl || ''} alt="Profile Image" className='w-20 h-20 bg-slate-400 rounded-full' />
                    ) : (
                        <></>
                    )
                }

                <h5 className='text-gray-950 font-medium leading-6'>
                    {user?.fullName || ''}
                </h5>
            </div>

            {
                SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? 'text-white bg-violet-500' : ''} py-3 px-6 rounded-lg mb-3`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
                ))
            }
        </div>
    );
};

export default SideMenu;