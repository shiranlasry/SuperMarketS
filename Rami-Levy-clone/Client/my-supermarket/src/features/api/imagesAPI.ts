import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteImagesWithProductIdAPI = createAsyncThunk < number | null, { product_id: number | null }> ('delete-images-with-product-id', async (product_id) => {
    try {
        const response = await axios.delete(`/api/products-images/delete-product-image/${product_id.product_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteImagesWithProductIdAPI()");
        }
        return results.insertId;
    } catch (error) {
        console.error(error);
        return null;
    }
}
)