import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavBarItem } from "../../rami-types";

export const getAllNavBarItemsApi = createAsyncThunk<NavBarItem[] | null, void>('get-all-nav_bar_items', async () => {
    try {
        const response = await axios.get("/api/navbar_itsems");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllProductsApi()");
        }
       
        return results;

    } catch (error) {
        console.error(error);
        return null;
    }
})