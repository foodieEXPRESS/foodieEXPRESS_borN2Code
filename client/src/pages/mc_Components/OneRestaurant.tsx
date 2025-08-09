import React from "react";
import { useNavigate } from "react-router-dom";
import type { RestaurantCardProps } from  '../../types/mc_Types'


export const OneRestaurant: React.FC<RestaurantCardProps> = ({

  name,
  category,
  cuisine,
  description,
  rating,
  eta,
  priceLevel,
  logoText,
  freeDelivery = true,

}) => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate(`/list/details`);
  };

  const bgColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <div className="w-[373px] h-[403px] rounded-xl shadow-lg bg-white overflow-hidden">

      {/* Top Image/Banner */}

      <div
        className={`relative ${randomColor} h-60 flex items-center justify-center text-white text-7xl font-semibold`}
      >
        {category}
        {freeDelivery && (
          <span className="absolute top-2 left-2 text-xs bg-green-400 text-white px-2 py-1 rounded-full">
            Free Delivery
          </span>
        )}
        <span className="absolute top-2 right-2 text-xs bg-gray-100 text-black px-2 py-1 rounded-full">
          {eta}
        </span>
      </div>

      {/* Info Section */}

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div
            className={`${randomColor} text-white font-bold text-sm px-3 py-2 rounded-md`}
          >
            {logoText}
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{cuisine}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">{description}</p>

        {/* Rating, ETA, Price + Order */}

        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">

              {/* Star SVG */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {rating}
            </span>
            <span className="flex items-center gap-1">

              {/* Clock SVG */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <line
                  x1="12"
                  y1="6"
                  x2="12"
                  y2="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="12"
                  x2="16"
                  y2="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {eta}
            </span>
            <span>{priceLevel}</span>
          </div>

          <button
            onClick={handleOrderNow}
            className="text-xs bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-800 transition"
          >
            Order Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 inline-block ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 2L2 12h3v8h6v-6h4v6h6v-8h3L12 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};