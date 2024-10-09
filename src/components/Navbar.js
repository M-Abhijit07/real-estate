import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        logout(); // Call logout function to clear user state
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div>
                <Link to="/" className="font-bold text-xl">Real Estate App</Link>
            </div>
            <div>
                {user ? (
                    <div className="flex items-center">
                        <Link to="/profile" className="mr-4 cursor-pointer hover:underline">
                            {`Welcome, ${user.username}`} {/* Make the username clickable */}
                        </Link>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
