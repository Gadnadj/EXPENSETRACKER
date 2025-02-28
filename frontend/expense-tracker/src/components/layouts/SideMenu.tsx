import { SIDE_MENU_DATA } from '../../utils/data';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    activeMenu: string;
}

const SideMenu = ({ activeMenu }: Props) => {
    const { user, clearUser } = useUser();
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);

    const handleClick = (route: string) => {
        if (route === '/logout') {
            clearUser();
            navigate('/login');
            return;
        }
        navigate(route);
    };

    return (
        <div className={`w-64 h-[calc(100vh-61px)] border-r p-5 sticky top-[61px] z-20 transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200/50'
        }`}>
            <div className='flex flex-col items-center justify-center gap-3 mt-2 mb-3'>
                {user?.profileImageUrl ? (
                    <img 
                        src={user.profileImageUrl} 
                        alt="Profile Image" 
                        className={`w-20 h-20 rounded-full transition-colors duration-300 ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                        }`} 
                    />
                ) : (
                    <CharAvatar fullName={user?.fullName} width='w-20' height='h-20' style='text-xl' />
                )}

                <h5 className={`font-medium leading-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    {user?.fullName || ''}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer transition-colors duration-300 ${
                        activeMenu === item.label 
                            ? isDarkMode
                                ? 'text-white bg-violet-600'
                                : 'text-white bg-violet-500'
                            : isDarkMode
                                ? 'text-gray-200 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;