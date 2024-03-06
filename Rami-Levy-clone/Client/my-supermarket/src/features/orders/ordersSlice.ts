import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { OrderForList } from "../../rami-types";
import { getUserOrdersListAPI } from "./ordersAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface OrdersState {
  ordersList: OrderForList[] | null; // Ensure that ordersList is an array
  status: Status;
}

const initialState: OrdersState = {
  ordersList: null, // Initialize ordersList as an empty array
  status: Status.IDLE,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
    reducers: {
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersListAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUserOrdersListAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.ordersList = action.payload; 
      })
      .addCase(getUserOrdersListAPI.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const ordersListSelector = (state: RootState) => state.orders.ordersList;
export const selectOrdersStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
