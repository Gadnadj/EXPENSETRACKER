import { SIDE_MENU_DATA } from '../../utils/data';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

type Props = {
    activeMenu: string;
}

const SideMenu = ({ activeMenu }: Props) => {

    const { user, clearUser } = useUser();
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        if (route === '/logout') {
            clearUser();
            navigate('/login');
            return;
        }
        navigate(route);
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white dark:bg-gray-800 border-r border-gray-200/50 dark:border-gray-700 p-5 sticky top-[61px] z-20 transition-colors duration-200'>
            <div className='flex flex-col items-center justify-center gap-3 mt-2 mb-3'>
                {
                    user?.profileImageUrl ? (
                        <img src={user.profileImageUrl || ''} alt="Profile Image" className='w-20 h-20 bg-gray-400 dark:bg-gray-600 rounded-full' />
                    ) : (
                        <CharAvatar fullName={user?.fullName} width='w-20' height='h-20' style='text-xl' />
                    )
                }

                <h5 className='text-gray-900 dark:text-white font-medium leading-6'>
                    {user?.fullName || ''}
                </h5>
            </div>

            {
                SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${
                            activeMenu === item.label 
                                ? 'text-white bg-violet-500 dark:bg-violet-600' 
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } py-3 px-6 rounded-lg mb-3 cursor-pointer transition-colors duration-200`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
                ))
            }
        </div >
    );
};

export default SideMenu;