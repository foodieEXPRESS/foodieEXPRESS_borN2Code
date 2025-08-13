import { useState } from 'react';
import { ChefHat, Clock, Star, DollarSign, Sparkles } from 'lucide-react';

interface Props {
  onFiltersChange?: (filters: any) => void;
}

export default function Filters({ onFiltersChange }: Props) {
  const [filters, setFilters] = useState({
    cuisineType: '',
    openNow: false,
    rating: '' as number | ''
  });
  const [showRating, setShowRating] = useState(false);

  const handleFilterChange = (filterName: string, value: any) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center"> 
        {/* Cuisine Type */}
        <div className="flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Cuisine Type</span>
          <select
            className="ml-3 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800 bg-white"
            value={filters.cuisineType}
            onChange={(e) => handleFilterChange('cuisineType', e.target.value)}
          >
            <option value="">All</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
            <option value="American">American</option>
            <option value="Japanese">Japanese</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Thai">Thai</option>
            <option value="French">French</option>
            <option value="Greek">Greek</option>
          </select>
        </div>
        <div className="flex items-center gap-3 ml-32"> 
          <Clock className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Delivery Time</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-3 ml-24 cursor-pointer select-none"
          onClick={() => setShowRating(true)}
        > 
          <Star className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Rating{filters.rating ? `: ${filters.rating}+` : ''}</span>
        </button>
        <div className="flex items-center gap-3 ml-24"> 
          <DollarSign className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Price Range</span>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Special Offers</span>
        </div>

        <div className="flex flex-col space-y-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-gray-600">Free Delivery</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={filters.openNow}
              onChange={(e) => handleFilterChange('openNow', e.target.checked)}
            />
            <span className="text-sm text-gray-600">Open Now</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-gray-600">Promoted</span>
          </label>
        </div>
      </div>
      {showRating ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowRating(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Choose rating</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowRating(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {[5,4,3,2,1].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`w-full border rounded-lg px-4 py-2 text-left hover:bg-gray-50 ${filters.rating === n ? 'border-gray-800' : 'border-gray-300'}`}
                  onClick={() => {
                    const value = n as number;
                    const newFilters = { ...filters, rating: value };
                    setFilters(newFilters);
                    onFiltersChange?.(newFilters);
                    setShowRating(false);
                  }}
                >
                  <span className="mr-2">{Array.from({ length: n }).map(() => '⭐').join('')}</span>
                  <span className="text-sm text-gray-700">{n}+ Stars</span>
                </button>
              ))}
              <button
                type="button"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => {
                  const newFilters = { ...filters, rating: '' as '' };
                  setFilters(newFilters);
                  onFiltersChange?.(newFilters);
                  setShowRating(false);
                }}
              >
                Clear selection
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


