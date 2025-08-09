import React from 'react';
import { IconSearch, IconChevronDown } from './Icons';

const SearchControls: React.FC = () => {
  return (
    <div className="rs-search-row">
      <div className="rs-input-wrap">
        <span className="rs-input__icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Search restaurants, cuisines, or dishes..."
          className="rs-input"
        />
      </div>

      <button className="rs-choose" type="button" aria-label="Choose option">
        <span>Choose option...</span>
        <IconChevronDown />
      </button>
    </div>
  );
};

export default SearchControls; 