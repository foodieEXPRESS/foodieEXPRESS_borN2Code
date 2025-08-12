import React from 'react';

const FilterSort: React.FC = () => {
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('FilterSort: Date filter changed to:', e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('FilterSort: Status filter changed to:', e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-7 flex items-center gap-6 m-12">
      <div className="font-bold text-xl mr-8">Filter & Sort</div>
      <div className="ml-auto flex gap-4">
        <label className="flex items-center gap-2 text-lg font-medium text-gray-900">
          Date:
          <select
            className="bg-gray-300 text-gray-900 font-semibold text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleDateChange}
          >
            <option>All Time</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-900">
          Status:
          <select
            className="bg-gray-300 text-gray-900 font-semibold text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleStatusChange}
          >
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
