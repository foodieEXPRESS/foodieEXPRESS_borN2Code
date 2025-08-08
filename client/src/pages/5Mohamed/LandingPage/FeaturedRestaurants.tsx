/**
 * File: client/src/component/FeaturedRestaurants.tsx
 * Purpose: Displays a grid of featured restaurants on the Home view.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: See `.MA__featured-*` rules in `client/src/styles.css`.
 */
import React from 'react';

const FeaturedRestaurants: React.FC = () => {
  const restaurants = [
    {
      cuisine: 'Italian',
      name: 'Bella Italia',
      rating: '4.6',
      deliveryTime: '20-35 min',
      bgColor: '#EF4444'
    },
    {
      cuisine: 'Sushi',
      name: 'Sushi Master',
      rating: '4.9',
      deliveryTime: '30-45 min',
      bgColor: '#3B82F6'
    },
    {
      cuisine: 'Burger',
      name: 'Burger Palace',
      rating: '4.7',
      deliveryTime: '30-45 min',
      bgColor: '#F97316'
    },
    {
      cuisine: 'Indian',
      name: 'Spice Garden',
      rating: '4.6',
      deliveryTime: '35-45 min',
      bgColor: '#22C55E'
    },
    {
      cuisine: 'Tacos',
      name: 'Taco Fiesta',
      rating: '4.8',
      deliveryTime: '25-35 min',
      bgColor: '#8B5CF6'
    },
    {
      cuisine: 'Chinese',
      name: 'Dragon Wok',
      rating: '4.7',
      deliveryTime: '30-40 min',
      bgColor: '#EF4444'
    }
  ];

  return (
    <section className="MA__featured-restaurants">
      <div className="MA__container">
        <h2>Featured Restaurants</h2>
        <p>Discover amazing restaurants near you and order your favorite meals with just a few clicks.</p>
        
        <div className="MA__restaurant-grid">
          {restaurants.map((restaurant, index) => (
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