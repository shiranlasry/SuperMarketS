import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, ProductsList } from "../../rami-types";

export const addNewCartApi = createAsyncThunk<CartItem | null, number>(
  "addNewCartApi",
  async (user_id) => {
    try {
      
      const response = await axios.post("/api/carts/add-new-cart", { user_id });
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials addNewCartApi()");
      }
      return results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const getUserActiveCartApi = createAsyncThunk<CartItem | null, number>(
  "getUserActiveCartApi",
  async (user_id) => {
    try {
      const response = await axios.get(
        `/api/carts/get-user-active-cart/${user_id}`
      );
      const { ok, results } = response.data;

      if (!ok) {
        throw new Error("Invalid credentials getUserActiveCartApi()");
      }
      return results[0].status_id === 1 ? results[0] : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
export const getUserActiveCartListApi = createAsyncThunk<
  ProductsList[] | null,
  number
>("getUserActiveCartListApi", async (cart_id) => {
  try {
    const response = await axios.get(
      `/api/carts/get-user-active-cart-list/${cart_id}`
    );
    const { ok, results } = response.data;
    console.log(`getUserActiveCartListApi results = ${results}`);
    if (!ok) {
      throw new Error("Invalid credentials getUserActiveCartListApi()");
    }
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const addProductToCartListApi = createAsyncThunk<
  ProductsList[] | null,
  { product_id: number; cart_id: number }
>("addProductToCartListApi", async ({ product_id, cart_id }) => {
  try {
    const response = await axios.post("/api/carts/add-product-to-cart-list", {
      product_id,
      cart_id,
    });
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials addProductToCartListApi()");
    }
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const UpdateAmountProductCartListApi = createAsyncThunk<
  ProductsList[] | null,
  { product_id: number; cart_id: number; product_amount: number }
>(
  "UpdateAmountProductCartListApi",
  async ({ product_id, cart_id, product_amount }) => {
    try {
      const response = await axios.post(
        "/api/carts/update-amount-product-cart-list",
        { product_id, cart_id, product_amount }
      );
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials addProductToCartListApi()");
      }
      return results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const updateCartStatusApi = createAsyncThunk<
  CartItem | null,
  { cart_id: number | null; status_id: number }
>("updateCartStatusApi", async ({ cart_id, status_id }) => {
  try {
    if (cart_id === null || status_id === null)
      throw new Error("Invalid credentials updateCartStatusApi()");
    const response = await axios.patch("/api/carts/update-cart-status", {
      cart_id,
      status_id,
    });
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials updateCartStatusApi()");
    }
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
});
