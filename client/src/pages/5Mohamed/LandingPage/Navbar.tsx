import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="MA__navbar">
      <div className="MA__navbar-container">
        <div className="MA__navbar-logo">
          <div className="MA__logo-icon">
            <span className="MA__plus-sign">+</span>
          </div>
          <span className="MA__logo-text">FoodieExpress</span>
        </div>
        <div className="MA__navbar-auth">
          <a href="#signin" className="MA__sign-in-link">Sign In</a>
          <button className="MA__navbar-order-btn">Order Now</button>
        </div>
        
        <div className="MA__navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`MA__hamburger ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`MA__hamburger ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`MA__hamburger ${isMenuOpen ? 'active' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 