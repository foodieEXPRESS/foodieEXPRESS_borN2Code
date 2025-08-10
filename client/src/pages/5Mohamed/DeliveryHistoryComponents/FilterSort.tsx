import React from 'react';

const FilterSort: React.FC = () => {
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('FilterSort: Date filter changed to:', e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('FilterSort: Status filter changed to:', e.target.value);
  };

  return (
    <div className="MA__filter-sort">
      <div className="MA__filter-title">Filter & Sort</div>
      <div className="MA__filter-controls">
        <label className="MA__filter-label">
          Date:
          <select className="MA__filter-select" onChange={handleDateChange}>
            <option>All Time</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </label>
        <label className="MA__filter-label">
          Status:
          <select className="MA__filter-select" onChange={handleStatusChange}>
            <option>All Status</option>
            <option>Completed</option>
            <option>Canceled</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterSort; 