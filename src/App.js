import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import withAuth from './components/withAuth';

const ProtectedPropertyPage = withAuth(PropertyPage); // Wrap PropertyPage with withAuth
const ProtectedProfilePage = withAuth(ProfilePage); // Wrap ProfilePage with withAuth

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/properties" element={<ProtectedPropertyPage />} /> {/* Protected Route */}
                    <Route path="/profile" element={<ProtectedProfilePage />} /> {/* Protected Route */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
