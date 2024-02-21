import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteInventoryAPI = createAsyncThunk<number | null, { product_id: number | null }>('delete-inventory', async ({ product_id }) => {
    try {
        const response = await axios.delete(`/api/products-inventories/delete-product-inventory/${product_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteInventoryAPI()");
        }
        return results.insertId;
    } catch (error) {
        console.error(error);
        return null;
    }
})
