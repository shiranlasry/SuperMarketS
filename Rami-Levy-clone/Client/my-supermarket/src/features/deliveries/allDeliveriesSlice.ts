//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {  Delivery } from "../../rami-types"
import {getAllDeliveriesApi} from "./allDeliveriesAPI"

enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface allDeliveriesState {
    value: Delivery [] | null ,
    status: Status
}

const initialState: allDeliveriesState = {
    value: null,
    status: Status.IDLE
}

export const DeliveriesSlice = createSlice({
    name: "deliveries",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDeliveriesApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getAllDeliveriesApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                state.value = action.payload
            })
            .addCase(getAllDeliveriesApi.rejected, (state) => {
                state.status = Status.FAILED
            })
    }
})

export const deliveriesSelector = (state: RootState) => state.deliveries.value


export default DeliveriesSlice.reducer