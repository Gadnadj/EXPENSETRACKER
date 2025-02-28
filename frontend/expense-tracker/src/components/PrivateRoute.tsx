import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute; 