import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;
 
        let isMouted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMouted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                if (isMouted) {
                    clearUser();
                    navigate('/login');
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMouted = false;
        };

    }, [updateUser, clearUser, navigate, user]);
};