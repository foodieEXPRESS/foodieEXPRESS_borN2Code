/**
 * File: client/src/component/FeaturedRestaurants.tsx
 * Purpose: Displays a grid of featured restaurants on the Home view.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: See `.MA__featured-*` rules in `client/src/styles.css`.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080';
const normalizeImageUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) return url;
  return url.startsWith('/') ? `${API_BASE}${url}` : `${API_BASE}/${url}`;
};

interface DisplayRestaurant {
  cuisine: string;
  name: string;
  rating: string;
  deliveryTime: string;
  imageUrl?: string | null;
}

const FeaturedRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/landingpage/getall')
      .then(({ data }) => { if (Array.isArray(data)) setRestaurants(data); })
      .catch(() => {});
  }, []);

  const mapToCard = (r: any): DisplayRestaurant => ({
    cuisine: r.cuisineType || r.cuisine?.name || 'Restaurant',
    name: r.name,
    rating: typeof r.rating === 'number' ? r.rating.toFixed(1) : (r.rating ?? '4.5'),
    deliveryTime: '30-45 min',
    imageUrl: normalizeImageUrl(r.media?.[0]?.url || null),
  });

  const displayRestaurants: DisplayRestaurant[] = Array.isArray(restaurants) ? restaurants.map(mapToCard) : [];

  return (
    <section className="MA__featured-restaurants">
      <div className="MA__container">
        <h2>Featured Restaurants</h2>
        <p>Discover amazing restaurants near you and order your favorite meals with just a few clicks.</p>
        <div className="MA__restaurant-grid">
          {displayRestaurants.map((restaurant, index) => (
            <div key={index} className="MA__restaurant-card">
              <div className="MA__card-top">
                {restaurant.imageUrl ? (
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <h3>{restaurant.cuisine}</h3>
                )}
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