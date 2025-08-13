import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantById } from '../../store/restaurantDetailsSlice';
import type { RootState, AppDispatch } from '../../store';
import type { MenuItem } from '../../types/mc_Types'
import { AboutRestaurant } from '../../components/RestaurantList/AboutRestaurant';
import { fetchRestaurantImage } from '../../store/restaurantDetailsSlice';
import { useParams } from "react-router-dom";
import Navbar from "../mc_Components/Restaurant_Navbar"
import { increment,addItem } from '../../store/CartReducer';
import type { CartItem } from '../../types/mc_Types'; 


const RestaurantDetails: React.FC = () => {
  const { restId } = useParams<{ restId: string }>(); 
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, imageUrl } = useSelector((state: RootState) => state.restaurantDetails);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const reviews = useSelector((state: RootState) => state.restaurantDetails.reviews ?? []);
  

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : data?.rating || 0;

  
  useEffect(() => {
    if (restId) {
      dispatch(fetchRestaurantById(restId));
      dispatch(fetchRestaurantImage(restId));
    }
  }, [dispatch, restId]);


   useEffect(() => {
    if (data && data.menus?.length > 0) {
      setActiveTab(data.menus[0].name);
    }
  }, [data]);

  if (loading) return <div
  className="w-[50px] aspect-square rounded-full border-[8px] border-black border-r-transparent animate-spin"
  style={{ animationDuration: "1s" }}
></div>
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data</div>;

  const displayImage =
    imageUrl ||
    'https://www.hotel-des-elmes.com/_next/image?url=https%3A%2F%2Fminio.kustomcms.fr%2F646a6ddc62ccd7c8f1291b5a%2FKEV02057.jpg&w=1920&q=80';

  return (
    <main className="font-sans mx-auto px-4 pb-10">
      <Navbar />
      {/* Header section with restaurant image and name */}
      {/* Restaurant image and name */}

      <div className="w-full h-64 rounded-lg overflow-hidden mb-6 shadow-lg">
        <img
          src={displayImage}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">{data.name}</h1>

      {/* About section using AboutRestaurant component */}

      <section className="mb-8 flex flex-col items-center">
        <AboutRestaurant
          restaurantId={data.id}
          description={data.description || ""}
          rating={averageRating}
          deliveryTime={data.deliveryTime || ""}
          deliveryFee={data.deliveryFee || ""}
          address={data.address || ""}
          contactPhone={data.contactPhone || ""}
        />
      </section>

      {/* Tabs for food types */}

      <section className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-4">
          {data.menus?.map((menu: any) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.name)}
              className={`px-4 py-2 font-semibold transition border-b-2 ${
                activeTab === menu.name
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:border-indigo-500"
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>
      </section>

      {/* Menu items for active tab */}
      
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab}</h2>
        {data.menus?.filter((menu: any) => menu.name === activeTab).map((menu: any) => (
  <div
    key={menu.id}
    className="mb-8"
    style={{ boxShadow: "0px 4px 20px 0px #00000014" }}
  >
    <div className="flex flex-col gap-4">
      {menu.items?.length > 0 ? (
        menu.items.map((item: any) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            available={item.available}
            tags={item.tags?.map((t: any) => t.tag.name) || []}
            restaurantName={data.name}
            media={item.media}
          />
        ))
      ) : (
        <p className="text-gray-500">No items in this category.</p>
      )}
    </div>
  </div>
))}
      </section>

      <section className="mt-10 w-full ">
  <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <div key={review.id} className="border-b py-3">
        <div className="flex justify-between">
          <span className="font-semibold">{review.user.fullName}</span>
          <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
        </div>
        <p>{review.comment}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No reviews yet.</p>
  )}
</section>
    </main>
  );
};

const MenuItem: React.FC<MenuItem & {}> = ({
  id,
  name,
  tags = [],
  description,
  price,
  restaurantName,
  media
}) => {
  
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
  const dispatch = useDispatch<AppDispatch>();

  const handleToCart = (item:CartItem) => {
    dispatch(increment());
    dispatch(addItem(item));
  };


  return (
    <article className="rounded-lg p-5 bg-white shadow hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-x-6">
      <div className="flex gap-4 flex-1">
     <img
  src={media?.[0]?.url || 'https://via.placeholder.com/150'}
  alt={name}
  className="w-36 h-36 object-cover rounded flex-shrink-0"
/>

        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold">{name}</h3>
            {tags?.map((tag) => (
              <span
                key={tag}
                className={`${getTagClasses(tag)} text-xs font-semibold px-2 py-1 rounded select-none`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mt-1">{description}</p>
          <button onClick={()=>handleToCart({
  id,
  name,
  tags,
  description: description || "",
  price,
  quantity: 1,
  restaurantName,
})}
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

export default RestaurantDetails;