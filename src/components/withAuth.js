import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user } = useAuth();

        // If user is not authenticated, redirect to login page
        if (!user) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
