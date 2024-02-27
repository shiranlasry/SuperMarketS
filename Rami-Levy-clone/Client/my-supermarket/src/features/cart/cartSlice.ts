// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

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
        state.items.push(action.payload);
        state.items[state.items.length - 1].quantity = 1;
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.product_id === action.payload.product_id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
        else if (existingItem.quantity === 1) {
            const removeIndex = state.items.findIndex((item) => item.product_id === action.payload.product_id);
            state.items.splice(removeIndex, 1);

          }
        }
    },
    
    // Add other cart-related actions (remove item, update quantity, etc.) if needed
  },
});

export const { addToCart, removeItem } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export default cartSlice.reducer;