import React, { useState } from 'react';
import Navbar from '../LandingPage/Navbar';
import SearchBar from './SearchBar';
import FilterCategories from './FilterCategories';
import SpecialOffers from './SpecialOffers';
import ResultsFooter from './ResultsFooter';

const RestaurantSearch: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="MA__restaurant-search">
      <Navbar />

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