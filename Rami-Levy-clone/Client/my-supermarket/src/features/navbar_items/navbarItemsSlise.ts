//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { NavBarItem } from "../../rami-types"
import { getAllNavBarItemsApi } from "./navbarItemsAPI"


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface NavBarItemsState {
    value: NavBarItem[] | null ,
    status: Status
}

const initialState: NavBarItemsState = {
    value: null,
    status: Status.IDLE
}

export const NavBarItemsSlice = createSlice({
    name: "navbar items",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNavBarItemsApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getAllNavBarItemsApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                state.value = action.payload
            })
            .addCase(getAllNavBarItemsApi.rejected, (state) => {
                state.status = Status.FAILED
            })
           
        
    }
})


export const navBarItemsSelector = (state: RootState) => state.navbarItems.value


export default NavBarItemsSlice.reducer