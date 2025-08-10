import React from 'react';

const SearchControls: React.FC = () => {
  console.log('SearchControls: Component loaded');

  const handleSearch = () => {
    console.log('SearchControls: Search button clicked');
  };

  const handleLocationChange = () => {
    console.log('SearchControls: Location changed');
  };

  return (
    <div className="rs-search-row">
      <div className="rs-input-wrap">
        <span className="rs-input__icon">🔍</span>
        <input 
          type="text" 
          className="rs-input" 
          placeholder="Search for restaurants, cuisines, or dishes..."
        />
      </div>
      <button className="rs-choose" onClick={handleLocationChange}>
        Choose Location
        <span>▼</span>
      </button>
      <button className="rs-btn rs-btn--primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchControls; 