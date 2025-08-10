import React from 'react';

const Filters: React.FC = () => {
  console.log('Filters: Component loaded');

  const handleFilterChange = (filterType: string, value: string) => {
    console.log('Filters: Filter changed:', filterType, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
          <span className="text-lg">👜</span>
          <span className="text-sm font-medium text-gray-700">Cuisine Type</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
          <span className="text-lg">🕐</span>
          <span className="text-sm font-medium text-gray-700">Delivery Time</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
          <span className="text-lg">⭐</span>
          <span className="text-sm font-medium text-gray-700">Rating</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
          <span className="text-lg">💰</span>
          <span className="text-sm font-medium text-gray-700">Price Range</span>
        </div>
      </div>
      <div className="border-l border-gray-200 pl-6">
        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
          <span>🎯</span>
          Special Offers
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="free-delivery" 
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e) => handleFilterChange('free-delivery', e.target.checked.toString())}
            />
            <label htmlFor="free-delivery" className="text-sm text-gray-600 cursor-pointer">
              Free Delivery
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="open-now" 
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e) => handleFilterChange('open-now', e.target.checked.toString())}
            />
            <label htmlFor="open-now" className="text-sm text-gray-600 cursor-pointer">
              Open Now
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="promoted" 
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e) => handleFilterChange('promoted', e.target.checked.toString())}
            />
            <label htmlFor="promoted" className="text-sm text-gray-600 cursor-pointer">
              Promoted
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters; 