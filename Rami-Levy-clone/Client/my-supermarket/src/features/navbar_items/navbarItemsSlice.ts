//NavBarItems in user slice

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NavBarItem } from "../../rami-types";
import { getAllNavBarItemsApi } from "./navbarItemsAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface NavBarItemsState {
  value: NavBarItem[] | null;
  status: Status;
}

const initialState: NavBarItemsState = {
  value: null,
  status: Status.IDLE,
};

export const NavBarItemsSlice = createSlice({
  name: "navbar items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNavBarItemsApi.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAllNavBarItemsApi.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(getAllNavBarItemsApi.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const navBarItemsSelector = createSelector(
  (state: RootState) => state.navbarItems.value,
  (value) => {
    const sessionItems = JSON.parse(
      sessionStorage.getItem("navbarItems") || "[]"
    );
    if (sessionItems.length > 0) {
      return sessionItems;
    } else {
      return value;
    }
  }
);

export default NavBarItemsSlice.reducer;
