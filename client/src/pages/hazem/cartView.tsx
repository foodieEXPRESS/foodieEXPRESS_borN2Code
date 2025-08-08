import React from 'react';
import type { CartViewProps } from './propsTypes';
import type { CartItem } from './dataTypes';

const CartView: React.FC<Partial<CartViewProps>> = ({
  items = [
    {
      id: '1',
      name: 'Margherita Pizza',
      restaurant: 'Bella Italia',
      price: 16.99,
      quantity: 2,
      customizations: ['Extra cheese', 'Thin crust']
    },
    {
      id: '2',
      name: 'Spaghetti Carbonara',
      restaurant: 'Bella Italia',
      price: 18.99,
      quantity: 1,
      customizations: []
    },
    {
      id: '3',
      name: 'Caesar Salad',
      restaurant: 'Bella Italia',
      price: 12.99,
      quantity: 1,
      customizations: ['No croutons', 'Extra dressing']
    },
    {
      id: '4',
      name: 'Tiramisu',
      restaurant: 'Bella Italia',
      price: 8.99,
      quantity: 1,
      customizations: []
    }
  ],
  orderSummary = {
    subtotal: 73.95,
    deliveryFee: 2.99,
    serviceFee: 1.50,
    tax: 6.47,
    total: 84.91
  },
  onQuantityChange = () => {},
  onRemoveItem = () => {}
}) => {
  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pizza': 'bg-red-500',
      'Pasta': 'bg-orange-500',
      'Salad': 'bg-green-500',
      'Dessert': 'bg-pink-500',
      'default': 'bg-gray-500'
    };
    return colors[category] || colors.default;
  };

  // Helper function to get category from item name (for demo purposes)
  const getCategoryFromName = (name: string) => {
    if (name.toLowerCase().includes('pizza')) return 'Pizza';
    if (name.toLowerCase().includes('pasta') || name.toLowerCase().includes('spaghetti')) return 'Pasta';
    if (name.toLowerCase().includes('salad')) return 'Salad';
    if (name.toLowerCase().includes('tiramisu') || name.toLowerCase().includes('dessert')) return 'Dessert';
    return 'default';
  };

  return (
    <div className="min-h-screen bg-secondary-lighter p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <h1 className="text-2xl font-bold text-secondary-dark font-brand">FoodieExpress</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-secondary-gray hover:text-secondary-dark">Sign In</button>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Help
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {items.map((item: CartItem, index: number) => {
              const category = getCategoryFromName(item.name);
              const totalItemPrice = item.price * item.quantity;
              
              return (
                <div key={item.id}>
                  <div className="flex items-start gap-4 py-4">
                    {/* Category Icon */}
                    <div className={`${getCategoryColor(category)} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm font-medium">
                        {category === 'Pizza' ? 'P' : 
                         category === 'Pasta' ? 'PA' : 
                         category === 'Salad' ? 'S' : 
                         category === 'Dessert' ? 'D' : 'F'}
                      </span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary-dark text-lg mb-1">{item.name}</h3>
                      <p className="text-secondary-gray text-sm mb-2">Bella Italia</p>
                      
                                             {item.customizations && item.customizations.length > 0 && (
                         <div className="flex flex-wrap gap-2 mb-3">
                           {item.customizations.map((custom: string, idx: number) => (
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
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-secondary-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="font-medium text-secondary-dark min-w-[2rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
                        onClick={() => onRemoveItem(item.id)}
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

            {/* Add more items */}
            <div className="pt-4">
              <button className="text-secondary-gray hover:text-secondary-dark font-medium">
                + Add more items
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-secondary-dark mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-secondary-gray">
                <span>Subtotal</span>
                <span className="font-semibold">${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-gray">
                <span>Delivery Fee</span>
                <span className="font-semibold">${orderSummary.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-gray">
                <span>Service Fee</span>
                <span className="font-semibold">${orderSummary.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-gray">
                <span>Tax</span>
                <span className="font-semibold">${orderSummary.tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary-gray placeholder-secondary-gray"
                />
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-secondary-dark">
                <span>Total</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;