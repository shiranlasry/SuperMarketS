import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  Order, ProductsList } from "../../rami-types";


export const getUserOrdersAPI = createAsyncThunk<Order[] | null, number>("getUserOrdersListAPI", async (user_id: number) => {
    try {
        const response = await axios.get(`/api/orders/get-user-orders/${user_id}`);
        const { ok, results } = response.data;
        console.log("results", results);
        if (!ok) {
        throw new Error("Invalid credentials getUserOrdersListAPI()");
        }
      
        return results;
    } catch (error) {
        console.error(error);
        return null;
    }
});

export const getUserOrderCartDetailsAPI = createAsyncThunk<ProductsList[] | null, number>("getUserOrderCartDetailsAPI", async (cart_id: number) => {
    try {
        debugger
        const response = await axios.get(`/api/orders/get-user-order-cart-details/${cart_id}`);
       
        const { ok, results } = response.data;
        console.log("results", results);
        if (!ok) {
        throw new Error("Invalid credentials getUserOrderCartsDetailsAPI()");
        }
       
        return results as ProductsList[];
    } catch (error) {
        console.error(error);
        return null;
    }
});
