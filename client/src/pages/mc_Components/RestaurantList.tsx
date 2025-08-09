import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchUserById, fetchRestaurantsNearUser } from '../../store/restaurantListSlice';
import { OneRestaurant } from './OneRestaurant';
import type { Restaurant } from '../../types/mc_Types'

export const RestaurantList: React.FC<{ userId: string }> = ({ userId }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { user, restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurantList
  );

  //  Get user data by ID from props

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  //  Once we have user location, fetch nearest restaurants

  
  useEffect(() => {
    if (user) {
      dispatch(fetchRestaurantsNearUser({ userLat: user.latitude, userLng: user.longitude }));
    }
  }, [dispatch, user]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Nearby Restaurants</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {restaurants.map((rest : Restaurant) => (
          <OneRestaurant key={rest.id} {...rest} />
        ))}
      </div>
    </div>
  );
};
