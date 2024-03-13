//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { City } from "../../rami-types"
import { getAllCitiesAPI } from "./citiesAPI"


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface CitiesState {
    value: City [] | null ,
    status: Status
}

const initialState: CitiesState = {
    value: null,
    status: Status.IDLE
}

export const CitiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCitiesAPI.pending, (state) => {
            state.status = Status.LOADING;
          })
          .addCase(getAllCitiesAPI.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
          })
          .addCase(getAllCitiesAPI.rejected, (state) => {
            state.status = Status.FAILED;
          })
        
    }
})

export const citiesSelector = (state: RootState) => state.cities.value


export default CitiesSlice.reducer