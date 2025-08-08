import React, { useState } from "react";

// Dummy MenuItem type
interface MenuItem {
  id: string;
  name: string;
  category: string;
  tags?: string[];
  description: string;
  price: number;
}

// Extended CartItem with quantity
interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (itemId: string) => void;
  addToCart: (item: CartItem) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, addToCart }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-3">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Dummy usage with local state ---
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      category: "Pizza",
      description: "Classic cheese and tomato",
      price: 9.99,
      quantity: 2,
    },
    {
      id: "2",
      name: "Spaghetti Carbonara",
      category: "Pasta",
      description: "Creamy sauce with pancetta",
      price: 12.5,
      quantity: 1,
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  return <Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />;
};

export default Cart;
