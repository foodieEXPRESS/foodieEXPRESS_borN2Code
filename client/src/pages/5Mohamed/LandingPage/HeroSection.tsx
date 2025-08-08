/**
 * File: client/src/component/HeroSection.tsx
 * Purpose: Prominent hero area on the Home view with heading and CTA.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: `.MA__hero`, `.MA__hero-content`, `.MA__hero-heading` in `client/src/styles.css`.
 */
import React from 'react';

interface HeroSectionProps {
  onNavigateToSearch?: () => void;
  onNavigateToDelivery?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToSearch, onNavigateToDelivery }) => {
  return (
    <section className="MA__hero">
      <div className="MA__hero-content">
        <div className="MA__hero-heading">
          <h1>Delicious Food</h1>
          <h2>Delivered Fast</h2>
        </div>
        
        <div className="MA__hero-description">
          <p>Order from your favorite restaurants and get fresh, hot meals delivered to</p>
          <div className="MA__overlapping-text">Background</div>
        </div>
        
        <div className="MA__search-container">
          <input 
            type="text" 
            placeholder="Enter your delivery address..." 
            className="MA__search-input"
          />
          <button className="MA__search-button">Find Food</button>
        </div>
        
        <div className="MA__cta-buttons">
          <button className="MA__order-noww-btn">Order Now</button>
          <button className="MA__view-menu-btn">New Menu</button>
        </div>

        <div className="MA__navigation-buttons">
          <button 
            className="MA__nav-btn MA__search-btn"
            onClick={onNavigateToSearch}
          >
            🔍 Search Restaurants
          </button>
          <button 
            className="MA__nav-btn MA__delivery-btn"
            onClick={onNavigateToDelivery}
          >
            📊 Delivery History
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;