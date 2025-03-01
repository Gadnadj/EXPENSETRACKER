import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { User } from '../utils/types';

interface childrenType {
    children: ReactNode
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    updateUser: (userData: User) => void;
    clearUser: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: childrenType) => {
    // Initialize state with data from localStorage
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Update localStorage when user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    //Function to update user data
    const updateUser = (userData: User) => {
        setUser(userData);
    };

    //Function to clear user data on logout
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;