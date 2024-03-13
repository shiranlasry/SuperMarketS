// cartSlice.ts

import {  createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store'; // Assuming you have a RootState type defined
import { CartItem } from '../../rami-types';
import { updateCartStatusApi,addNewCartApi, getUserActiveCartApi, getUserActiveCartListApi } from './cartAPI';
import { stat } from 'fs';



enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed"
}
interface CartState {
  activeCart: CartItem | null;
  isOpenCart: boolean;
  isToPayPressed: boolean;
  status: Status;
}

const initialState: CartState = {
  activeCart: null,
  isOpenCart: false,
  isToPayPressed: false,
  status: Status.IDLE
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsOpenCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    },
    setIsOpenCartTrue: (state) => {
      state.isOpenCart = true;
    },
    setIsToPayPressedTrue: (state) => {
      state.isToPayPressed = true;
    },
    setIsToPayPressedFalse: (state) => {
      state.isToPayPressed = false;
    }

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
      .addCase(updateCartStatusApi.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateCartStatusApi.fulfilled, (state,action) => {
        state.status = Status.IDLE;
        // אמור לאפס את העגלה הפעילה ואחר כך להגיע להדר ולהוסיף עגלה חדשה
        state.activeCart = null;
        state.isOpenCart = false;
      })
      .addCase(updateCartStatusApi.rejected, (state) => {
        state.status = Status.FAILED;
      });
      
      
  },
});


export const {setIsOpenCartTrue, setIsOpenCart, setIsToPayPressedTrue, setIsToPayPressedFalse } = CartSlice.actions;
// Selector to get cart items from the store
export const activeCartSelector = (state: RootState) => state.cart.activeCart;
export const isOpenCartSelector = (state: RootState) => state.cart.isOpenCart;
export const isToPayPressedSelector = (state: RootState) => state.cart.isToPayPressed;


export default CartSlice.reducer;
