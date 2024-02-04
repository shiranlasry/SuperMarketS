//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { SubFoodCategories } from "../../rami-types"

enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface CategoriesState {
    value: SubFoodCategories[] | null ,
    status: Status
}

const initialState: CategoriesState = {
    value: null,
    status: Status.IDLE
}

export const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
     
        
    }
})


export const categoriesSelector = (state: RootState) => state.categories.value


export default CategoriesSlice.reducer