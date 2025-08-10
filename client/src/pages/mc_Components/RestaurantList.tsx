import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchUserById, fetchRestaurantsNearUser, updateUserLocation,} from "../../store/restaurantListSlice";
import OneRestaurant from "./OneRestaurant";
import type { Restaurant } from "../../types/mc_Types";
import { useNavigate } from "react-router-dom";
import Navbar from '../5Mohamed/LandingPage/Navbar'

//  http://localhost:5173/list

const RestaurantList: React.FC= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurantList
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

      dispatch(fetchUserById());
  }, [dispatch]);

   useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          console.log("User location:", lat, lng);

          // Optionally update user location in backend and redux state
          dispatch(updateUserLocation({ latitude: lat, longitude: lng }));
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, [dispatch]);

  useEffect(() => {
    // Once user has lat & lng, fetch nearby restaurants
    if (user?.latitude != null && user?.longitude != null) {
      dispatch(
        fetchRestaurantsNearUser({
          userLat: user.latitude,
          userLng: user.longitude,
        })
      );
    }
  }, [dispatch, user]);

  const handleFilter = () => {
    navigate(`/restaurant-search/`);
  };

  const safeRestaurants: Restaurant[] = Array.isArray(restaurants)
    ? restaurants
    : [];

  const filteredRestaurants = safeRestaurants.filter(
    (rest: Restaurant) =>
      (rest.name &&
        rest.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (rest.cuisineType &&
        rest.cuisineType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
     <>
    {/* Navbar on its own */}
    <div className="w-full">
      <Navbar />
    </div>
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-1">Restaurants Near You</h1>
      <p className="text-gray-500 mb-6">
        Discover amazing restaurants and order your favorite meals
      </p>

      {/* Search + Filters */}
      <div className="mb-6 flex items-center bg-white rounded-lg shadow px-4 py-3 max-w-3xl">
        <svg
          className="w-5 h-5 text-gray-400 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          placeholder="Search restaurants, cuisines, or dishes..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="ml-4 flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-3.586L4.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Restaurant count */}
      <p className="mb-4 text-gray-600">
        {filteredRestaurants.length} restaurants found
      </p>

      {/* Restaurant Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants.map((rest: Restaurant) => (
          <OneRestaurant key={rest.id} {...rest} />
        ))}
      </div>
    </div>
    </>
  );
};

export default RestaurantList;
