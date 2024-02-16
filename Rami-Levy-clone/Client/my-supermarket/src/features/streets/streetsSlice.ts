// Streets slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Street } from "../../rami-types"
import { getAllStreetsAPI } from "./streetsAPI"



enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface StreetsState {
    value: Street [] | null ,
    status: Status
}

const initialState: StreetsState = {
    value: null,
    status: Status.IDLE
}

export const StreetsSlice = createSlice({
    name: "streets",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllStreetsAPI.pending, (state) => {
            state.status = Status.LOADING;
          })
          .addCase(getAllStreetsAPI.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
          })
          .addCase(getAllStreetsAPI.rejected, (state) => {
            state.status = Status.FAILED;
          })
       
        
    }
})

export const streetsSelector = (state: RootState) => state.streets.value


export default StreetsSlice.reducer