//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { User } from "../../rami-types"
import { logInUserApi ,logOutUserApi} from "./loggedInUserAPI"


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface LoggedInUserState {
    value: User | null ,
    status: Status
}

const initialState: LoggedInUserState = {
    value: null,
    status: Status.IDLE
}

export const LoggedInUserSlice = createSlice({
    name: "loggedInUser",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(logInUserApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(logInUserApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                state.value = action.payload
            })
            .addCase(logInUserApi.rejected, (state) => {
                state.status = Status.FAILED
            })
            .addCase(logOutUserApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(logOutUserApi.fulfilled, (state) => {
                state.status = Status.IDLE
                state.value = null
            })
            .addCase(logOutUserApi.rejected, (state) => {
                state.status = Status.FAILED
            })
        
    }
})
export const { setUser } = LoggedInUserSlice.actions; // Export the actions

export const loggedInUserSelector = (state: RootState) => state.loggedInUser.value
export const loggedInUserStatusSelector = (state: RootState) => state.loggedInUser.status
export const loggedInUsertateSelector = (state: RootState) => state.loggedInUser

export default LoggedInUserSlice.reducer