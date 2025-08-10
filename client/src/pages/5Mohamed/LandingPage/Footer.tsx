/**
 * File: client/src/component/Footer.tsx
 * Purpose: App footer with links and branding.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: `.MA__footer`, `.MA__footer-content`, `.MA__footer-links` in `client/src/styles.css`.
 */
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="MA__footer">
      <div className="MA__footer-content">
        <div className="MA__footer-column">
          <div className="MA__footer-logo">
            <div className="MA__logo-icon">
              <span className="MA__plus-sign">+</span>
            </div>
            <span className="MA__logo-text">FoodieExpress</span>
          </div>
          <p className="MA__footer-description">
            Your favorite food delivery app. Fast, fresh, and always delicious.
          </p>
        </div>
        
        <div className="MA__footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Restaurants</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        
        <div className="MA__footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div className="MA__footer-column">
          <h4>Follow Us</h4>
          <div className="MA__social-icons">
            <a href="#" className="MA__social-icon">
              <span>X</span>
            </a>
            <a href="#" className="MA__social-icon">
              <span>IG</span>
            </a>
            <a href="#" className="MA__social-icon">
              <span>FB</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="MA__footer-bottom">
        <p>© 2024 FoodieExpress. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 