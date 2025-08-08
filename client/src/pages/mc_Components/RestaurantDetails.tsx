import React, { useState } from "react";
import { AboutRestaurant } from "./AboutRestaurant.js";
import type { MenuItem, AboutCardProps } from '../../types/mc_Components'

const dummyMenu: MenuItem[] = [
  {
    id: "114654165416",
    name: "Margherita Pizza",
    category: "🍕 Pizza",
    tags: ["Popular", "Vegetarian"],
    description:
      "Fresh mozzarella, tomato sauce, basil, and olive oil on our signature wood-fired crust",
    price: 16.99,
  },
  {
    id: "48468468416446",
    name: "Pepperoni Supreme",
    category: "🍕 Pizza",
    tags: ["Popular"],
    description: "Premium pepperoni, mozzarella cheese, and our special tomato sauce",
    price: 19.99,
  },
  {
    id: "3",
    name: "Quattro Stagioni",
    category: "🍕 Pizza",
    tags: ["Spicy"],
    description: "Four seasons pizza with mushrooms, artichokes, ham, and olives",
    price: 22.99,
  },
  {
    id: "4",
    name: "Spaghetti Carbonara",
    category: "🍝 Pasta",
    tags: ["Creamy"],
    description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper",
    price: 14.99,
  },
  {
    id: "5",
    name: "Caesar Salad",
    category: "🥗 Salads",
    tags: ["Vegetarian", "Fresh"],
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese",
    price: 9.99,
  },
  {
    id: "6",
    name: "Tiramisu",
    category: "🍰 Desserts",
    description: "Rich Italian coffee-flavored dessert with mascarpone cheese and cocoa",
    price: 6.99,
  },
  {
    id: "7",
    name: "Lemonade",
    category: "🥤 Drinks",
    description: "Freshly squeezed lemon juice with a hint of mint",
    price: 3.5,
  },
  {
    id: "8",
    name: "Garlic Bread",
    category: "🧄 Appetizers",
    description: "Toasted bread with garlic, butter, and herbs",
    price: 4.99,
  },
];

const categories: string[] = [
  "🍕 Pizza",
  "🍝 Pasta",
  "🥗 Salads",
  "🧄 Appetizers",
  "🍰 Desserts",
  "🥤 Drinks",
];

const aboutCardData: AboutCardProps = {
  description: "Enjoy authentic Italian cuisine made with fresh ingredients and love.",
  rating: 4.8,
  deliveryTime: "25-35 min",
  deliveryFee: "$2.99",
  address: "123 Main Street, Downtown",
  phone: "(555) 123-4567",
};

const MenuItem: React.FC<MenuItem & {}> = ({
  name,
  tags = [],
  description,
  price,
}) => {
  const firstWord = name.split(" ")[0];

  const getTagClasses = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "popular":
        return "bg-yellow-300 text-gray-900 rounded-full";
      case "vegetarian":
        return "bg-green-300 text-gray-900 rounded-full";
      case "spicy":
        return "bg-red-300 text-white rounded-full";
      default:
        return "bg-red-100 text-gray-800";
    }
  };

  return (
    <article className="rounded-lg p-5 bg-white shadow hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-x-6">
      <div className="flex gap-4 flex-1">
        <span
          className="bg-red-500 text-white font-bold text-xl rounded select-none flex items-center justify-center flex-shrink-0"
          style={{ width: 150, height: 150 }}
        >
          {firstWord}
        </span>

        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold">{name}</h3>
            {tags.map((tag) => (
              <span
                key={tag}
                className={`${getTagClasses(tag)} text-xs font-semibold px-2 py-1 rounded select-none`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mt-1">{description}</p>

          <button
            onClick={() => alert(`Added ${name} to cart!`)}
            className="mt-4 bg-indigo-500 text-white rounded px-6 py-2 font-semibold transition hover:bg-indigo-800 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-start mt-4 sm:mt-0">
        <p className="text-indigo-500 font-extrabold text-2xl">${price.toFixed(2)}</p>
      </div>
    </article>
  );
};

const RestaurantDetails: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredMenu = dummyMenu.filter((item) => item.category === activeCategory);

  return (
    <main className="font-sans mx-auto px-4 pt-4 pb-10">

      <section className="flex flex-col sm:flex-row sm:items-center gap-4 bg-red-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <h1 className="text-6xl font-extrabold text-shadow-lg">Bella Italia Restaurant</h1>
          <h1 className="text-3xl font-bold text-shadow">Bella Italia</h1>

          <div className="mt-6 w-20 h-20 rounded-md border-2 border-white flex items-center justify-center">
            <span className="text-white text-2xl font-bold text-shadow">BI</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:ml-6 text-sm font-semibold">
          <div className="text-shadow-sm">⭐ 4.8 (1247 reviews)</div>
          <div className="text-shadow-sm">⏱️ 25-35 min</div>
          <div className="text-shadow-sm">🚚 $2.99 delivery | Min $15.00</div>
          <div className="text-shadow-sm">📍 123 Main Street, Downtown</div>
          <div className="text-shadow-sm">📞 (555) 123-4567</div>
        </div>
      </section>

      <section className="mb-0">
        <AboutRestaurant {...aboutCardData} />
      </section>

      <section className="mt-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu</h2>

        <div className="flex flex-wrap gap-3 mb-4 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-semibold transition border-b-2 ${
                activeCategory === category
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:border-indigo-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-0 min-h-[600px] max-h-[1000px] overflow-y-auto border-0">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div key={item.id}>
                <MenuItem {...item} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No items available in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default RestaurantDetails;
