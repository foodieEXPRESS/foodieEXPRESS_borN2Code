import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchUserById, fetchRestaurantsNearUser } from '../../store/restaurantListSlice';
import OneRestaurant from './OneRestaurant';
import type { Restaurant } from '../../types/mc_Types';
import { useNavigate } from 'react-router-dom';

export const RestaurantList: React.FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurantList
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRestaurantsNearUser({ userLat: user.latitude, userLng: user.longitude }));
    }
  }, [dispatch, user]);

   const handleFilter = () => {
  navigate(`/toFilter/`);
};

  // Ensure restaurants is an array before filtering
  const safeRestaurants: Restaurant[] = Array.isArray(restaurants) ? restaurants : [];

  // Filter only if restaurants exist
  const filteredRestaurants = safeRestaurants.filter((rest: Restaurant) =>
    rest.name && rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rest.cuisineType && rest.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">for restaurant near you</h1>

      {/* Number of restaurants found */}
      <p className="mb-4 text-gray-600">{filteredRestaurants.length} restaurants found</p>

      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 max-w-4xl mx-auto">
          {/* Search Icon */}
          <div className="mr-2">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Search Input */}
          <input
            type="search"
            placeholder="Search restaurants, cuisines, or dishes..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Filters Button */}
          <button onClick={handleFilter} className="ml-4 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 flex items-center transition duration-200">
            {/* Filter Icon */}
            <svg
              className="w-4 h-4 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-3.586L4.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRestaurants.map((rest: Restaurant) => (
          <OneRestaurant key={rest.id} {...rest} />
        ))}
      </div>
      
      
    </div>
    
  );
};