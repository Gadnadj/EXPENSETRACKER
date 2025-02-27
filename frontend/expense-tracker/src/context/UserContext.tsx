import React, { createContext, ReactNode, useState } from 'react';
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

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: childrenType) => {
    const [user, setUser] = useState<User | null>(null);

    //Function to update user data
    const updateUser = (userData: User) => {
        setUser(userData);
    };

    //Function to clear user data on logout
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;