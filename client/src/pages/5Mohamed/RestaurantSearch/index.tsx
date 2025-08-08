import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterCategories from './FilterCategories';
import SpecialOffers from './SpecialOffers';
import ResultsFooter from './ResultsFooter';

const RestaurantSearch: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="MA__restaurant-search">
      {/* Custom Header for Restaurant Search */}
      <div className="MA__search-header">
        <div className="MA__filter-view-text">Filter view</div>
        <div className="MA__search-logo">
          <div className="MA__search-logo-icon">
            <span>+</span>
          </div>
          <span className="MA__search-logo-text">FoodieExpress</span>
        </div>
        <div className="MA__search-auth">
          <a href="#signin" className="MA__search-signin">Sign In</a>
          <button className="MA__search-order-btn">Order Now</button>
        </div>
      </div>

      <div className="MA__search-main">
        <div className="MA__search-title">Find Your Perfect Meal</div>
        <div className="MA__search-subtitle">
          Filter through thousands of restaurants to find exactly what you're craving
        </div>

        <div className="MA__search-card">
          <SearchBar />
          <FilterCategories />
          <SpecialOffers />
        </div>

        <ResultsFooter selectedView={selectedView} onChange={setSelectedView} />
      </div>
    </div>
  );
};

export default RestaurantSearch; 