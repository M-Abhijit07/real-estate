import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/AuthContext';

const PropertyPage = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    
    // State for filters
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minBedrooms, setMinBedrooms] = useState(1);

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('https://real-estate-74l6.onrender.com/api/properties');
            const data = await response.json();
            setProperties(data);
        };

        const fetchFavorites = async () => {
            const response = await fetch(`https://real-estate-74l6.onrender.com/api/auth/user`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Include token in the header
                },
            });
            const data = await response.json();
            setFavorites(data.favorites.map(fav => fav._id)); // Extract favorite property IDs
        };

        fetchProperties();
        fetchFavorites();
    }, [user.token]);

    const toggleFavorite = async (propertyId) => {
        const updatedFavorites = favorites.includes(propertyId)
            ? favorites.filter(id => id !== propertyId)
            : [...favorites, propertyId];

        setFavorites(updatedFavorites);

        await fetch(`https://real-estate-74l6.onrender.com/api/auth/update-favorites`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ favorites: updatedFavorites }),
        });
    };

    // Filter the properties based on user inputs
    const filteredProperties = properties.filter(property => 
        property.Price >= minPrice && 
        property.Price <= maxPrice &&
        property.Bedrooms >= minBedrooms
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Properties</h2>

            {/* Filter Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Filter Properties</h3>
                
                {/* Price Range Filter */}
                <div className="flex space-x-4 mt-4">
                    <div>
                        <label htmlFor="minPrice" className="block text-gray-700">Min Price</label>
                        <input 
                            type="number" 
                            id="minPrice" 
                            value={minPrice} 
                            onChange={(e) => setMinPrice(Number(e.target.value))} 
                            min="0"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block text-gray-700">Max Price</label>
                        <input 
                            type="number" 
                            id="maxPrice" 
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(Number(e.target.value))} 
                            min="0"
                            className="border p-2 w-full"
                        />
                    </div>
                </div>

                {/* Bedrooms Filter */}
                <div className="mt-4">
                    <label htmlFor="minBedrooms" className="block text-gray-700">Bedrooms (min)</label>
                    <select 
                        id="minBedrooms" 
                        value={minBedrooms} 
                        onChange={(e) => setMinBedrooms(Number(e.target.value))} 
                        className="border p-2 w-full"
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                                {num}+
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Properties Display Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProperties.length > 0 ? filteredProperties.map(property => (
                    <div key={property._id} className="bg-white border rounded p-4 shadow">
                        <h3 className="text-xl font-bold">{property.Name}</h3>
                        <p className="text-gray-600">${property.Price}</p>
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
                )) : (
                    <p>No properties match the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyPage;
