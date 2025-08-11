import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="MA__navbar ">
      <div className="MA__navbar-container">
        <div className="MA__navbar-logo">
          <div className="MA__logo-icon">
            <span className="MA__plus-sign">+</span>
          </div>
          <span className="MA__logo-text">FoodieExpress</span>
        </div>
        <div className="MA__navbar-auth">
          <a href="#" className="MA__sign-in-link">Sign In</a>
          <a href="#" className="MA__order-now-btn">Order Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 