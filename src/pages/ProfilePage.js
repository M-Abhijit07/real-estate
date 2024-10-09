import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useAuth(); // Get user from Auth context
    const [favorites, setFavorites] = useState([]); // State to store favorite property IDs
    const [properties, setProperties] = useState([]); // State to store fetched properties
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchUserFavorites = async () => {
            if (user) {
                try {
                    const response = await fetch(`https://real-estate-74l6.onrender.com/api/auth/user`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`, // Include token in the header
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setFavorites(data.favorites.map(fav => fav._id)); // Extract favorite property IDs
                    }
                } catch (error) {
                    console.error('Error fetching user favorites:', error);
                }
            }
        };

        const fetchProperties = async () => {
            const response = await fetch('https://real-estate-74l6.onrender.com/api/properties');
            const data = await response.json();
            setProperties(data);
        };

        fetchUserFavorites();
        fetchProperties();
    }, [user]); // Fetch when user changes

    const toggleFavorite = async (propertyId) => {
        const updatedFavorites = favorites.includes(propertyId)
            ? favorites.filter(id => id !== propertyId) // Remove from favorites
            : [...favorites, propertyId]; // Add to favorites

        setFavorites(updatedFavorites); // Update state

        // Send the updated favorites to the backend
        await fetch(`https://real-estate-74l6.onrender.com/api/auth/update-favorites`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`, // Include token in the header
            },
            body: JSON.stringify({ favorites: updatedFavorites }),
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            {user && <h3 className="text-xl mb-4">Welcome, {user.username}!</h3>} {/* Display username */}
            <button onClick={() => navigate('/properties')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
                Back to Properties
            </button>
            <div>
                <h3 className="text-xl font-semibold">Favorites:</h3>
                {favorites.length === 0 ? (
                    <p>No favorite properties yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {properties.filter(property => favorites.includes(property._id)).map(property => (
                            <div key={property._id} className="bg-white border rounded p-4 shadow">
                                <h3 className="text-xl font-bold">{property.Name}</h3>
                                <p className="text-gray-600">{property.Price}</p>
                                <p>{property.Description}</p>
                                <p>{property.Location}</p>
                                <p>{property.Bedrooms} Bedrooms</p>
                                <p>{property.Baths} Baths</p>
                                <p>{property.Total_Area} sqft</p>

                                <div className="flex items-center mt-2">
                                    <FontAwesomeIcon
                                        icon={favorites.includes(property._id) ? solidStar : regularStar}
                                        className={`cursor-pointer text-yellow-400 text-2xl shadow-lg transition-all duration-300 ${favorites.includes(property._id) ? 'animate-bounce text-yellow-500' : ''}`}
                                        onClick={() => toggleFavorite(property._id)} // Toggle favorite on click
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
