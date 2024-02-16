// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    // Add other cart-related actions (remove item, update quantity, etc.) if needed
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export default cartSlice.reducer;