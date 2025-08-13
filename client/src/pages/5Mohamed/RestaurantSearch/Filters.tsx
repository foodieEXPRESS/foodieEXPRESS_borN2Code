import { useState } from 'react';
import { ChefHat, Clock, Star, DollarSign, Sparkles } from 'lucide-react';

interface Props {
  onFiltersChange?: (filters: any) => void;
}

export default function Filters({ onFiltersChange }: Props) {
  const [filters, setFilters] = useState({
    cuisineType: ''
  });

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
      {/* Filter Categories */}
      <div className="flex items-center"> 
        {/* Cuisine Type */}
        <div className="flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Cuisine Type</span>
        </div>
        {/* Delivery Time - مسافة أكبر من Cuisine Type */}
        <div className="flex items-center gap-3 ml-32"> 
          <Clock className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Delivery Time</span>
        </div>
        {/* Rating - مسافة متقاربة من Delivery Time */}
        <div className="flex items-center gap-3 ml-24"> 
          <Star className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Rating</span>
        </div>
        {/* Price Range - مسافة متقاربة من Rating */}
        <div className="flex items-center gap-3 ml-24"> 
          <DollarSign className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Price Range</span>
        </div>
      </div>

      {/* Special Offers Section - On the right */}
      <div className="flex flex-col space-y-4">
        {/* Special Offers Heading */}
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Special Offers</span>
        </div>

        {/* Special Offers Checkboxes */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-gray-400 rounded-sm bg-white"></div>
            <span className="text-sm text-gray-600">Free Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-gray-400 rounded-sm bg-white"></div>
            <span className="text-sm text-gray-600">Open Now</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-gray-400 rounded-sm bg-white"></div>
            <span className="text-sm text-gray-600">Promoted</span>
          </div>
        </div>
      </div>
    </div>
  );
}


