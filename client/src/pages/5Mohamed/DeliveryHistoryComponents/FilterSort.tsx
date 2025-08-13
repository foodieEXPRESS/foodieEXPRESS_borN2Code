import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { setFilters } from './deliveryHistorySlice';
import './FilterSort.css';

const FilterSort: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.deliveryHistory.filters);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    dispatch(setFilters(updated));
  };

  return (
    <div className="MA__filter-sort">
      <div className="MA__filter-title">Filter & Sort</div>
      <div className="MA__filter-controls">
        <label className="MA__filter-label">
          Date:
          <select
            name="dateRange"
            className="MA__filter-select"
            value={filters.dateRange}
            onChange={handleChange}
          >
            <option value="all">All Time</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
        </label>
        <label className="MA__filter-label">
          Status:
          <select
            name="status"
            className="MA__filter-select"
            value={filters.status}
            onChange={handleChange}
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
