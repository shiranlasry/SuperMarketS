import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Order, ProductsList } from "../../rami-types";
import { getUserOrdersAPI ,getUserOrderCartDetailsAPI} from "./ordersAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface OrdersState {
  userOrdersList: Order[] | null; // Ensure that ordersList is an array
  selectedOrderDetails: ProductsList[] | null;
  status: Status;
}

const initialState: OrdersState = {
  userOrdersList: null, // Initialize ordersList as an empty array
  selectedOrderDetails: null,
  status: Status.IDLE,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
    reducers: {
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUserOrdersAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;  
        state.userOrdersList = action.payload; 
      })
      .addCase(getUserOrdersAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(getUserOrderCartDetailsAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUserOrderCartDetailsAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.selectedOrderDetails = action.payload;
      })
      .addCase(getUserOrderCartDetailsAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
   
      ;
  },
});

export const userOrdersListSelector = (state: RootState) => state.orders.userOrdersList;
export const selectOrdersStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
