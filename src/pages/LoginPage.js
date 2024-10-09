import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://real-estate-74l6.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Check if the error message is related to user existence
                if (response.status === 400) {
                    setError('No such user exists'); // Set error message
                }
                throw new Error(errorData.message);
            }

            const data = await response.json();
            // Assuming the user object contains username, email, etc.
            login({ username: data.username, token: data.token }); // Set the user data
            
            // Redirect to Property page after successful login
            navigate('/properties'); // Use the useNavigate hook

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error message */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Login
                </button>
                <p className="mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
