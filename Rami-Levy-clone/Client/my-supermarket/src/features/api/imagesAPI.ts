import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const deleteImagesWithProductIdAPI = createAsyncThunk<
  number | null,
  { product_id: number | null }
>("delete-images-with-product-id", async (product_id) => {
  try {
    const response = await axios.delete(
      `/api/products-images/delete-product-image/${product_id.product_id}`
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials deleteImagesWithProductIdAPI()");
    }
    return results.insertId;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const deleteSingleImageAPI = createAsyncThunk<
  number | null,
  { product_id: number | null; isA: boolean }
>("delete-single-image", async ({ product_id, isA }) => {
  try {
    const response = await axios.patch(
      `/api/products-images/delete-single-image/${product_id}/${
        isA ? "true" : "false"
      }`
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials deleteSingleImageAPI()");
    }
    toast.success("Image deleted successfully");
    return results.insertId;
  } catch (error) {
    console.error(error);
    return null;
  }
});
