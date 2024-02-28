// cartSlice.ts

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../rami-types";
import { RootState } from '../../app/store'; // Assuming you have a RootState type defined
import { CartItem } from './types'; // Assuming you have defined types for CartItem and CartState

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.product_id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach((item) => {
        const existingItemIndex = state.items.findIndex((i) => i.product_id === item.product_id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = item;
        } else {
          state.items.push(item);
        }
      });
    },
  },
});

export const { addToCart, removeItem, updateCart } = cartSlice.actions;

// Selector to get cart items from the store
export const selectCartItems = (state: RootState) => state.cart.items;


export default cartSlice.reducer;
