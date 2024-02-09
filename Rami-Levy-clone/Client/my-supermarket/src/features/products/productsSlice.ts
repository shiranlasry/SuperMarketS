//logged in user slice

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Product } from "../../rami-types"
import { getAllProductsApi } from "./productsAPI"

enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}

interface ProductsState {
    value: Product[] | null,
    status: Status
}

const initialState: ProductsState = {
    value: null,
    status: Status.IDLE
}

export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsApi.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(getAllProductsApi.fulfilled, (state, action) => {
                state.status = Status.IDLE
                state.value = action.payload
            })
            .addCase(getAllProductsApi.rejected, (state) => {
                state.status = Status.FAILED
            })
    }
})

export const productsSelector = (state: RootState) => state.products.value

export default ProductsSlice.reducer