import React from 'react';

const FilterCategories: React.FC = () => (
  <div className="MA__filter-categories">
    <div className="MA__filter-category">
      <span className="MA__filter-category-icon">🍽️</span>
      <span className="MA__filter-category-text">Cuisine Type</span>
    </div>
    <div className="MA__filter-category">
      <span className="MA__filter-category-icon">⏰</span>
      <span className="MA__filter-category-text">Delivery Time</span>
    </div>
    <div className="MA__filter-category">
      <span className="MA__filter-category-icon">⭐</span>
      <span className="MA__filter-category-text">Rating</span>
    </div>
    <div className="MA__filter-category">
      <span className="MA__filter-category-icon">💰</span>
      <span className="MA__filter-category-text">Price Range</span>
    </div>
  </div>
);

export default FilterCategories; 