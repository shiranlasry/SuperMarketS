//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { User } from "../../rami-types"
import { logInUserApi ,getUserByIdApi,logOutUserApi, addNewUserAddressApi,getUserAddressesApi, getUserFromTokenApi} from "./loggedInUserAPI"


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
            .addCase(getUserFromTokenApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getUserFromTokenApi.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload
            })
            .addCase(getUserFromTokenApi.rejected, (state) => {
                state.status = Status.FAILED
            })
            .addCase(addNewUserAddressApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(addNewUserAddressApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                
                if (Array.isArray(action.payload)) {
                    // If payload is an array of Address
                    if (state.value !== null) {
                        state.value.addresses = action.payload;
                    }
                }
            })

            .addCase(addNewUserAddressApi.rejected, (state) => {
                state.status = Status.FAILED
            })
            .addCase(getUserAddressesApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getUserAddressesApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                if (Array.isArray(action.payload)) {
                    // If payload is an array of Address
                    if (state.value !== null) {
                        state.value.addresses = action.payload;
                    }
                }
            })
            .addCase(getUserAddressesApi.rejected, (state) => {
                state.status = Status.FAILED
            })
            .addCase(getUserByIdApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getUserByIdApi.fulfilled, (state, action) => {
                
                state.status = Status.IDLE
                state.value = action.payload
            })
            .addCase(getUserByIdApi.rejected, (state) => {
                state.status = Status.FAILED
            })
        
    }
})
export const { setUser } = LoggedInUserSlice.actions; // Export the actions

export const loggedInUserSelector = (state: RootState) => state.loggedInUser.value
export const loggedInUserStatusSelector = (state: RootState) => state.loggedInUser.status
export const loggedInUsertateSelector = (state: RootState) => state.loggedInUser

export default LoggedInUserSlice.reducer