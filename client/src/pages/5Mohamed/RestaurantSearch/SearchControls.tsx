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
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Search restaurants, cuisines, or dishes..."
        />
      </div>
      <button 
        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700"
        onClick={handleLocationChange}
      >
        Choose option...
        <span className="text-gray-500">▼</span>
      </button>
      <button 
        className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchControls; 