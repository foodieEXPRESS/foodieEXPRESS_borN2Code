import React from 'react';

// ============================================================================
// FILTER SORT COMPONENT
// ============================================================================

const FilterSort: React.FC = () => (
  <div className="MA__filter-sort">
    <div className="MA__filter-title">Filter & Sort</div>
    <div className="MA__filter-controls">
      <label className="MA__filter-label">
        Date:
        <select className="MA__filter-select">
          <option>All Time</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </label>
      <label className="MA__filter-label">
        Status:
        <select className="MA__filter-select">
          <option>All Status</option>
          <option>Completed</option>
          <option>Canceled</option>
        </select>
      </label>
    </div>
  </div>
);

export default FilterSort; 