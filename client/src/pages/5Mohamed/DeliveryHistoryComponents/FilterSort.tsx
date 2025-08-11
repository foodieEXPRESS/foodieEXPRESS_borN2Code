import React, { useState } from 'react';
import './FilterSort.css';

interface FilterSortProps {
  onFilterChange: (filters: any) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all'
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, dateRange: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('FilterSort: Date filter changed to:', e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, status: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('FilterSort: Status filter changed to:', e.target.value);
  };

  return (
    <div className="MA__filter-sort">
      <div className="MA__filter-title">Filter & Sort</div>
      
      {/* Original Filters */}
      <div className="MA__filter-controls">
        <label className="MA__filter-label">
          Date:
          <select 
            className="MA__filter-select" 
            value={filters.dateRange}
            onChange={handleDateChange}
          >
            <option value="all">All Time</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
        </label>
        
        <label className="MA__filter-label">
          Status:
          <select 
            className="MA__filter-select"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Canceled</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterSort; 