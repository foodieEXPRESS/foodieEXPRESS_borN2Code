import React from 'react';

const SearchBar: React.FC = () => (
  <div className="MA__search-bar">
    <div className="MA__search-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <input 
      type="text" 
      placeholder="Search restaurants, cuisines, or dishes..."
      className="MA__search-input"
    />
    <div className="MA__filter-dropdown">
      <select className="MA__dropdown-select">
        <option>Choose option...</option>
      </select>
      <span className="MA__dropdown-arrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  </div>
);

export default SearchBar; 