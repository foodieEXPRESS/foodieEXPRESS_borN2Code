export default function Filters() {
  return (
    <div className="flex items-start justify-between">
      {/* Filter Categories */}
      <div className="flex items-center gap-12">
        {/* Cuisine Type */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-800 rounded-sm bg-white"></div>
          <span className="text-lg font-semibold text-gray-900">Cuisine Type</span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-800 rounded-sm bg-white"></div>
          <span className="text-lg font-semibold text-gray-900">Delivery Time</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">★</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Rating</span>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-800 rounded-sm bg-white"></div>
          <span className="text-lg font-semibold text-gray-900">Price Range</span>
        </div>

        {/* Special Offers */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-800 rounded-sm bg-white"></div>
          <span className="text-lg font-semibold text-gray-900">Special Offers</span>
        </div>
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
  );
}


