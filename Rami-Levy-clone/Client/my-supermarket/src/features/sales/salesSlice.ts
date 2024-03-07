import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Sales } from "../../rami-types";
import { getSalesAPI } from "./salesAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface SalesState {
  sales: Sales[];
  status: Status;
}

const initialState: SalesState = {
  sales: [],
  status: Status.IDLE,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalesAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getSalesAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.sales = action.payload;
      })
      .addCase(getSalesAPI.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const selectSales = (state: RootState) => state.sales.sales;
export const selectSalesStatus = (state: RootState) => state.sales.status;

export default salesSlice.reducer;
