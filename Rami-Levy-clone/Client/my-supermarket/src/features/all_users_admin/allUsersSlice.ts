//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { User } from "../../rami-types"
import { getAllUsersApi } from "./allUsersAPI"  



enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface AllUsersState {
    value: User[] | null ,
    status: Status
}

const initialState: AllUsersState = {
    value: null,
    status: Status.IDLE
}

export const AllUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsersApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllUsersApi.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.value = action.payload
        })
        .addCase(getAllUsersApi.rejected, (state) => {
            state.status = Status.FAILED
        })
        
    }
})


export const allUsersSelector = (state: RootState) => state.allUsers.value


export default AllUsersSlice.reducer