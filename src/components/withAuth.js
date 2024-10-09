import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user } = useAuth(); // Get user from Auth context

        if (!user) {
            return <Navigate to="/login" replace />; // Redirect to login if user is not authenticated
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
