// cartSlice.ts

import {  createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store'; // Assuming you have a RootState type defined
import { CartItem } from '../../rami-types';
import {  getUserCartsApi, getUserCartsListsApi } from './cartAPI';



enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed"
}
interface CartState {
  activeCart: CartItem[] | null;
  isOpenCart: boolean;
  status: Status;
}

const initialState: CartState = {
  activeCart: null,
  isOpenCart: false,
  status: Status.IDLE
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsOpenCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getUserCartsListsApi.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getUserCartsListsApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.activeCart = action.payload;
        })
        .addCase(getUserCartsListsApi.rejected, (state) => {
            state.status = Status.FAILED;
        })
        .addCase(getUserCartsApi.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getUserCartsApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.activeCart = action.payload;
        })
        .addCase(getUserCartsApi.rejected, (state) => {
            state.status = Status.FAILED;
        })
      
  },
});


export const { setIsOpenCart } = CartSlice.actions;
// Selector to get cart items from the store
export const activeCartSelector = (state: RootState) => state.cart.activeCart;
export const isOpenCartSelector = (state: RootState) => state.cart.isOpenCart;


export default CartSlice.reducer;
