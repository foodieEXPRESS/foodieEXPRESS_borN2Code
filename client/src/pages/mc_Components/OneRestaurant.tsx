  import React from "react";
  import { useNavigate } from "react-router-dom";
  import type { RestaurantDetails } from '../../types/mc_Types';

  const OneRestaurant: React.FC<RestaurantDetails> = ({
    id,
    name,
    cuisine,
    cuisineType,
    description,
    rating,
    priceLevel,
    deliveryTime,
    freeDelivery = true,
  }) => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
      navigate(`/list/details/${id}`);
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
    const initials = name
      .split(" ")
      .filter(Boolean)
      .map(((word: string, idx: number, arr: string[]) => (idx === 0 || idx === arr.length - 1 ? word[0].toUpperCase() : null)))
      .filter(Boolean)
      .join("");

    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

const renderStars = (rating: number) => {
  const stars = Math.round(rating); // or Math.floor(rating) if you prefer
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < stars ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

    

    return (
<div className="max-w-[373px] w-full rounded-xl shadow-lg bg-white overflow-hidden flex flex-col h-[403px]">
        {/* Top Image/Banner */}
        <div
          className={`relative ${randomColor} h-60 flex items-center justify-center text-white text-7xl font-semibold`}
        >
          {cuisineType}
          {freeDelivery && (
            <span className="absolute top-2 left-2 text-xs bg-green-400 text-white px-2 py-1 rounded-full">
              Free Delivery
            </span>
          )}
          <span className="absolute top-2 right-2 text-xs bg-gray-100 text-black px-2 py-1 rounded-full">
            {deliveryTime || "25-35 mins"}
          </span>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-2 flex flex-col flex-grow justify-between">
          <div className="flex items-center gap-3">
            <div className={`${randomColor} text-white font-bold text-sm px-3 py-2 rounded-md`}>
              {initials}
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
  {renderStars(rating ?? 0)}
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
                  <line x1="12" y1="6" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="12" x2="16" y2="14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {deliveryTime || "25-35 mins"}
              </span>
              <span>{priceLevel}</span>
            </div>

            <button
               onClick={(e) => {
                e.stopPropagation(); 
                  handleOrderNow();
                      }}
              
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

  export default OneRestaurant;
