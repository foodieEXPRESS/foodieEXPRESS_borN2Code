import React from 'react';
import  Restaurant_Navbar from "../mc_Components/Restaurant_Navbar"
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItem, updateQuantity ,increment,decrement} from '../../store/CartReducer'
import type { CartItem } from '../../store/CartReducer';

const CartView: React.FC = ()=>{

  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  console.log("selectedItems",items)
  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };
  // const getCategoryColor = (category: string) => {
  //   const colors: { [key: string]: string } = {
  //     'Pizza': 'bg-red-500',
  //     'Pasta': 'bg-orange-500',
  //     'Salad': 'bg-green-500',
  //     'Dessert': 'bg-pink-500',
  //     'default': 'bg-gray-500'
  //   };
  //   return colors[category] || colors.default;
  // };

  // // Helper function to get category from item name (for demo purposes)
  // const getCategoryFromName = (name: string) => {
  //   if (name.toLowerCase().includes('pizza')) return 'Pizza';
  //   if (name.toLowerCase().includes('pasta') || name.toLowerCase().includes('spaghetti')) return 'Pasta';
  //   if (name.toLowerCase().includes('salad')) return 'Salad';
  //   if (name.toLowerCase().includes('tiramisu') || name.toLowerCase().includes('dessert')) return 'Dessert';
  //   return 'default';
  // };

  return (

    <div className="container mx-auto p-4">

        {/* Left Panel - Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {items.map((item: CartItem, index: number) => {
              const totalItemPrice = item.price * item.quantity;
              return (
                <div key={item.id}>
                  <div className="flex items-start gap-4 py-4">
                    {/* Category Icon */}
                    <div className={"bg-gray-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"}>
                      <span className="text-white text-sm font-medium">
                        {/* {category === 'Pizza' ? 'P' : 
                         category === 'Pasta' ? 'PA' : 
                         category === 'Salad' ? 'S' : 
                         category === 'Dessert' ? 'D' : 'F'} */}
                         D
                      </span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary-dark text-lg mb-1">{item.name}</h3>
                      <p className="text-secondary-gray text-sm mb-2">{item.restaurantName}</p>
                      
                                             {item.tags && item.tags.length > 0 && (
                         <div className="flex flex-wrap gap-2 mb-3">
                           {item.tags.map((custom: string, idx: number) => (
                             <span 
                               key={idx} 
                               className="bg-gray-100 text-secondary-gray text-xs px-2 py-1 rounded-md"
                             >
                               {custom}
                             </span>
                           ))}
                         </div>
                       )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {handleQuantityChange(item.id, item.quantity - 1);dispatch(decrement())}}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-secondary-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="font-medium text-secondary-dark min-w-[2rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => {handleQuantityChange(item.id, item.quantity + 1);dispatch(increment())}}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-secondary-gray hover:bg-gray-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-primary text-lg mb-1">
                        ${totalItemPrice.toFixed(2)}
                      </div>
                      <div className="text-secondary-gray text-sm mb-2">
                        ${item.price.toFixed(2)} each
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {index < items.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>


            
  );
};

export default CartView;