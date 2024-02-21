//API
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../rami-types";

export const getAllProductsApi = createAsyncThunk<Product[] | null, void>('get-all-products', async () => {
    try {
        const response = await axios.get("/api/products-details");
        console.log("response", response)
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllProductsApi()");
        }
        // Save the data into session storage
           // sessionStorage.setItem('all_products', JSON.stringify(results));
        return results;
        
    } catch (error) {
        console.error(error);
        return null;
    }
})

export const updateInventoryAPI = createAsyncThunk<number | null, { product_id: number | null, units_stock: number | undefined }>('update-inventory', async ({ product_id, units_stock }) => {
    try {
        const response = await axios.patch("/api/products-inventories/update-inventory", { product_id, units_stock });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateInventoryAPI()");
        }
        return results.insertId;
    } catch (error) {
        console.error(error);
        return null;
    }
})

