// Streets slice

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Role } from "../../rami-types";
import { getAllRolesAPI } from "./rolesAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface rolesState {
  value: Role[] | null;
  status: Status;
}

const initialState: rolesState = {
  value: null,
  status: Status.IDLE,
};

export const RolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRolesAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAllRolesAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(getAllRolesAPI.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const rolesSelector = (state: RootState) => state.roles.value;

export default RolesSlice.reducer;
