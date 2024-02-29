// cartSlice.ts

import {  createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store'; // Assuming you have a RootState type defined
import { CartItem } from '../../rami-types';
import { addNewCartApi, getUserActiveCartApi, getUserActiveCartListApi } from './cartAPI';



enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed"
}
interface CartState {
  activeCart: CartItem | null;
  status: Status;
}

const initialState: CartState = {
  activeCart: null,
  status: Status.IDLE
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCartApi.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(addNewCartApi.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.activeCart = action.payload;
      })
      .addCase(addNewCartApi.rejected, (state) => {
        state.status = Status.FAILED;
      })
      // .addCase(addNewCartProductApi.pending, (state) => {
      //   state.status = Status.LOADING;
      // })
      // .addCase(addNewCartProductApi.fulfilled, (state, action) => {
      //   state.status = Status.IDLE;
      //   if (Array.isArray(action.payload)) {
      //     // If payload is an array of cartList
      //     if (state.activeCart !== null) {
      //         state.activeCart.cartList = action.payload;
      //     }
      // }
      // })
      // .addCase(addNewCartProductApi.rejected, (state) => {
      //   state.status = Status.FAILED;
      // })
      .addCase(getUserActiveCartApi.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUserActiveCartApi.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.activeCart = action.payload;
      })
      .addCase(getUserActiveCartApi.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(getUserActiveCartListApi.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUserActiveCartListApi.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        if (Array.isArray(action.payload)) {
          // If payload is an array of cartList
          if (state.activeCart !== null) {
              state.activeCart.cartList = action.payload;
          }
      }
      })
      .addCase(getUserActiveCartListApi.rejected, (state) => {
        state.status = Status.FAILED;
      })
      
  },
});



// Selector to get cart items from the store
export const activeCartSelector = (state: RootState) => state.cart.activeCart;


export default cartSlice.reducer;
