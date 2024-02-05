//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { FoodCategories, SubFoodCategories } from "../../rami-types"
import { getFoodCategoriesApi, get_SUB_FoodCategoriesApi } from "./categoriesAPI"

enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface CategoriesState {
    subFoodCategories: SubFoodCategories[] | null ,
    foodCategories: FoodCategories[] | null,
    
    status: Status
}

const initialState: CategoriesState = {
    subFoodCategories: null,
    foodCategories: null,
    status: Status.IDLE
}

export const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
       
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFoodCategoriesApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getFoodCategoriesApi.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.foodCategories = action.payload
        })
        .addCase(getFoodCategoriesApi.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(get_SUB_FoodCategoriesApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(get_SUB_FoodCategoriesApi.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.subFoodCategories = action.payload
        })
        .addCase(get_SUB_FoodCategoriesApi.rejected, (state) => {
            state.status = Status.FAILED
        })
    }
})


export const foodCategoriesSelector = (state: RootState) => state.categories.foodCategories
export const subFoodCategoriesSelector = (state: RootState) => state.categories.subFoodCategories   


export default CategoriesSlice.reducer