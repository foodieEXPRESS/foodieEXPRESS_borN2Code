import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    tags?: string[];
    restaurantId?: string;
    restaurantName?: string;
  }
  
interface CartState {
  count: number;
  items: CartItem[];
  //state.items is an array that holds all the items currently in the cart.
  
}

const initialState: CartState = {
  count: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      state.count += action.payload ?? 1;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      state.count -= action.payload ?? 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      },
      removeItem: (state, action: PayloadAction<string>) => {
     const itemToRemove = state.items.find(item => item.id === action.payload);
     if (itemToRemove) {
      state.count -= itemToRemove.quantity;
    }
        state.items = state.items.filter(item => item.id !== action.payload);
        //action.payload is the id of the item to be removed from the cart.
        //.filter() is a JavaScript array method that creates a new array with only the items that pass a certain test.
        //item => item.id !== action.payload is a test (called a predicate function) that checks if the item's id is NOT equal to action.payload.
//         The code goes through every item in the cart.
// If an item's id is NOT the same as action.payload, it stays in the cart.
// If an item's id IS the same as action.payload, it gets removed from the cart.
        //  state.count -=state.items.filter(item => item.id !== action.payload);

        // This line updates the count by subtracting the quantity of the removed item.
        // It uses reduce to sum up the quantities of all items in the cart.
      },
      updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find(item => item.id === action.payload.id);
        if (item) {
          if (action.payload.quantity <= 0) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
          }
          else {
            item.quantity = action.payload.quantity;
          }
        }
      },
      clearCart: (state) => {
        state.items = [];
      },
  },
});

export const { increment, reset,addItem, removeItem, updateQuantity, clearCart,decrement } = cartSlice.actions;
export default cartSlice.reducer;
// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);