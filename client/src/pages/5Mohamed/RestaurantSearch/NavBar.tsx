import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="rs-nav">
      <div className="rs-container rs-nav__inner">
        <div className="rs-brand">
          <div className="rs-brand__logo">+</div>
          <span className="rs-brand__name">FoodieExpress</span>
        </div>
        <div className="rs-actions">
          <button className="rs-link">Sign In</button>
          <button className="rs-btn rs-btn--primary">Order Now</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 