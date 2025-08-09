import React from 'react';

const SpecialOffers: React.FC = () => (
  <div className="MA__special-offers-section">
    <div className="MA__special-offers-dropdown">
      <select className="MA__special-offers-select">
        <option>Choose option...</option>
      </select>
      <span className="MA__special-offers-dropdown-arrow">▼</span>
    </div>

    <div className="MA__special-offers-title">
      <span className="MA__special-offers-icon">✨</span>
      Special Offers
    </div>

    <div className="MA__offers-checkboxes">
      <label className="MA__checkbox-item">
        <input type="checkbox" className="MA__checkbox" />
        <span className="MA__checkbox-text">Free Delivery</span>
      </label>
      <label className="MA__checkbox-item">
        <input type="checkbox" className="MA__checkbox" />
        <span className="MA__checkbox-text">Open Now</span>
      </label>
      <label className="MA__checkbox-item">
        <input type="checkbox" className="MA__checkbox" />
        <span className="MA__checkbox-text">Promoted</span>
      </label>
    </div>
  </div>
);

export default SpecialOffers; 