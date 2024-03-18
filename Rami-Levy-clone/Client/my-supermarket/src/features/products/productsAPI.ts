//API
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, UpdateProductFields } from "../../rami-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllProductsApi = createAsyncThunk<Product[] | null, void>(
  "get-all-products",
  async () => {
    try {
      debugger;
      const response = await axios.get("/api/products-details");

      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials getAllProductsApi()");
      }

      return results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const updateInventoryAPI = createAsyncThunk<
  number | null,
  { product_id: number | null; units_stock: number | undefined }
>("update-inventory", async ({ product_id, units_stock }) => {
  try {
    const response = await axios.patch(
      "/api/products-inventories/update-inventory",
      { product_id, units_stock }
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials updateInventoryAPI()");
    }
    return results.insertId;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getProductsByNavBarItemIdAPI = createAsyncThunk<
  Product[] | null,
  number
>("get-products-by-navbar-item-id", async (navbar_item_id) => {
  try {
    const response = await axios.get(
      `/api/products-details/get-products-by-navbar-item-id/${navbar_item_id}`
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials getProductsByNavBarItemId()");
    }

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const updateProductDetailes = createAsyncThunk<
  UpdateProductFields,
  UpdateProductFields
>("update-product-detailes", async (updatedProduct) => {
  try {
    const response = await axios.patch(
      "/api/products-details/update-product-detailes",
      updatedProduct
    );
    const { ok } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials updateProductDetailes()");
    }
    return ok;
  } catch (error) {
    console.error("Error updateProductDetailes:", error);
    return null;
  }
});

export const deleteProduct = createAsyncThunk<
  number | null,
  { product_id: number | null }
>("delete-product", async (product_id) => {
  try {
    const response = await axios.delete(
      `/api/products-details/delete-product/${product_id.product_id}`
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials deleteProduct()");
    }
    toast.success("מוצר נמחק בהצלחה ");
    return results.insertId;
  } catch (error) {
    console.error("Error deleteProduct:", error);
    return null;
  }
});

export const updateProductImageAPi = createAsyncThunk<
  { ok: boolean },
  FormData
>("update-product-image", async (formData) => {
  try {
    const response = await axios.post(
      "/api/products-images/update-product-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { ok } = response.data;

    if (!ok) {
      throw new Error("Error creating party");
    }
    toast.success("התמונה נשמרה בהצלחה");
    return { ok };
  } catch (error) {
    console.error(error);
    throw error;
  }
});
