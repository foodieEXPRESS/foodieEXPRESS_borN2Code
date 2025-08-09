/**
 * File: client/src/component/FeaturedRestaurants.tsx
 * Purpose: Displays a grid of featured restaurants on the Home view.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: See `.MA__featured-*` rules in `client/src/styles.css`.
 */
import React, { useEffect, useState } from 'react';

interface DisplayRestaurant {
  cuisine: string;
  name: string;
  rating: string; // kept as string to match UI formatting
  deliveryTime: string;
  bgColor: string;
}

const FeaturedRestaurants: React.FC = () => {
  // removed fake data; using fetch-only state

  const [displayRestaurants, setDisplayRestaurants] = useState<DisplayRestaurant[]>([]);

  useEffect(() => {
    const colors = ['#EF4444', '#3B82F6', '#F97316', '#22C55E', '#8B5CF6'];
    const times = ['20-35 min', '30-45 min', '25-35 min', '30-40 min', '35-45 min'];

    const mapToCard = (r: any): DisplayRestaurant => ({
      cuisine: r.cuisineType || r.cuisine?.name || 'Restaurant',
      name: r.name,
      rating: typeof r.rating === 'number' ? r.rating.toFixed(1) : (r.rating ?? '4.5'),
      deliveryTime: times[Math.floor(Math.random() * times.length)],
      bgColor: colors[Math.floor(Math.random() * colors.length)],
    });

    fetch('http://localhost:8080/api/details/')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDisplayRestaurants(data.map(mapToCard));
        }
      })
      .catch(() => {
        // if fetch fails, keep empty or previously shown items
      });
  }, []);

  return (
    <section className="MA__featured-restaurants">
      <div className="MA__container">
        <h2>Featured Restaurants</h2>
        <p>Discover amazing restaurants near you and order your favorite meals with just a few clicks.</p>
        
        <div className="MA__restaurant-grid">
          {displayRestaurants.map((restaurant, index) => (
            <div key={index} className="MA__restaurant-card">
              <div className="MA__card-top" style={{ backgroundColor: restaurant.bgColor }}>
                <h3>{restaurant.cuisine}</h3>
                <span className="MA__delivery-time">{restaurant.deliveryTime}</span>
              </div>
              <div className="MA__card-bottom">
                <h4>{restaurant.name}</h4>
                <p className="MA__cuisine-type">{restaurant.cuisine}</p>
                <div className="MA__rating">
                  <span className="MA__star">★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <button className="MA__order-btn">Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;