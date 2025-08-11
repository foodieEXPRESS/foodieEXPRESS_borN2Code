/**
 * File: client/src/component/HeroSection.tsx
 * Purpose: Prominent hero area on the Home view with heading and CTA.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: `.MA__hero`, `.MA__hero-content`, `.MA__hero-heading` in `client/src/styles.css`.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
 
  
  return (
    <section className="MA__hero">
      <div className="MA__hero-content">
        <div className="MA__hero-heading">
          <h1>Delicious Food</h1>
          <h2>Delivered Fast</h2>
        </div>
        
        <div className="MA__hero-description">
          <p>Order from your favorite restaurants and get fresh, hot meals delivered to your door.</p>
        </div>
        
        <div className="MA__search-container" onClick={()=>navigate('/list')}>
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
      </div>
    </section>
  );
};

export default HeroSection;