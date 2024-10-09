import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/AuthContext';

const PropertyDisplay = () => {
    const { user } = useAuth(); // Get user from Auth context
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('http://localhost:5000/api/properties');
            const data = await response.json();
            setProperties(data);
        };

        fetchProperties();
    }, []);

    const toggleFavorite = (propertyId) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(propertyId)) {
                const newFavorites = prevFavorites.filter(id => id !== propertyId);
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                return newFavorites;
            } else {
                const newFavorites = [...prevFavorites, propertyId];
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                return newFavorites;
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map(property => (
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
                            onClick={() => toggleFavorite(property._id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyDisplay;
