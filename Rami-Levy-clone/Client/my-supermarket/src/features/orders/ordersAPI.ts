import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderForList } from "../../rami-types";


export const getUserOrdersListAPI = createAsyncThunk<OrderForList[] | null, number>("getUserOrdersListAPI", async (user_id: number) => {
    try {
        const response = await axios.get(`/api/orders/get-user-orders-list/${user_id}`);
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

