import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://real-estate-74l6.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message); // Show error message
                throw new Error(errorData.message);
            }

            const data = await response.json();
            console.log(data.message); // Registration success message
            
            // Redirect to login page after successful registration
            navigate('/login'); // Use the useNavigate hook

        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error message */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
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
                    Register
                </button>
                <p className="mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
