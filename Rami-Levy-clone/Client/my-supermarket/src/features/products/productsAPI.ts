//API
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../rami-types";

export const getAllProductsApi = createAsyncThunk<Product[] | null, void>('get-all-products', async () => {
    try {
        const response = await axios.get("/api/products-details");
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