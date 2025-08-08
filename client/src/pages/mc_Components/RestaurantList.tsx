
import React, { useState } from "react";
import { OneRestaurant } from "./OneRestaurant";
import type { RestaurantCardProps } from '../../types/mc_Components'


// Dummy restaurant data
const dummyRestaurants: RestaurantCardProps[] = [
  {
    name: "Bella Italia",
    category: "Italian",
    cuisine: "Pizza",
    description: "Authentic Italian dishes from Naples",
    rating: 4.7,
    eta: "25-35 min",
    priceLevel: "$$",
    logoText: "BI",
    freeDelivery: true,
    lat: 36.8,
    lng: 10.2,
  },
  {
    name: "Tokyo Sushi",
    category: "Japanese",
    cuisine: "Sushi",
    description: "Fresh sushi & sashimi with wasabi kick",
    rating: 4.5,
    eta: "20-30 min",
    priceLevel: "$$$",
    logoText: "TS",
    freeDelivery: false,
    lat: 36.9,
    lng: 10.3,
  },
  {
    name: "Spicy Kitchen",
    category: "Indian",
    cuisine: "Curry",
    description: "Bold flavors and hot spices",
    rating: 4.3,
    eta: "30-40 min",
    priceLevel: "$",
    logoText: "SK",
    freeDelivery: true,
    lat: 36.7,
    lng: 10.1,
  },
  {
    name: "Le Gourmet",
    category: "French",
    cuisine: "Fine Dining",
    description: "Elegant French meals and wine",
    rating: 4.9,
    eta: "40-50 min",
    priceLevel: "$$$$",
    logoText: "LG",
    freeDelivery: false,
    lat: 36.85,
    lng: 10.25,
  },
];

const RestaurantList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [userLat, setUserLat] = useState("");
  const [userLng, setUserLng] = useState("");

  const filteredRestaurants = dummyRestaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "ETA") return a.eta.localeCompare(b.eta);
      return 0; // Default: "Recommended"
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1168px] mx-auto px-4 flex flex-col gap-6">
        <h2 className="font-inter font-bold text-3xl leading-tight text-[#1A1A1A]" style={{ width: 381 }}>
          Restaurants Near You
        </h2>
        <p className="mb-6 text-gray-600 text-lg font-normal" style={{ width: 507, height: 27 }}>
          Discover amazing restaurants and order your favorite meals
        </p>

        <div
          className="flex items-center rounded-[16px] bg-white shadow-md"
          style={{ height: 98, paddingLeft: 44, paddingRight: 44, width: "100%" }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, cuisines, or dishes..."
            className="flex-grow max-w-[400px] h-[50px] rounded-[12px] border border-gray-300 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={userLat}
            onChange={(e) => setUserLat(e.target.value)}
            className="w-[110px] h-[50px] rounded-[12px] border border-gray-300 px-3 ml-6 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={userLng}
            onChange={(e) => setUserLng(e.target.value)}
            className="w-[110px] h-[50px] rounded-[12px] border border-gray-300 px-3 ml-6 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="h-[50px] px-6 rounded-[12px] border border-gray-300 text-sm hover:bg-gray-100 transition ml-6">
            Filters
          </button>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-semibold text-[#1A1A1A]">
            {filteredRestaurants.length} restaurants found
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-[36px] rounded-[12px] bg-[#D9D9D9] text-black text-sm"
            style={{ width: 209 }}
          >
            <option value="Recommended">Sort by: Recommended</option>
            <option value="ETA">Sort by: ETA</option>
          </select>
        </div>
      </div>

      <div className="max-w-[1520px] mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {filteredRestaurants.map((restaurant, index) => (
            <OneRestaurant key={index} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;