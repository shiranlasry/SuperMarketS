import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../../rami-types";
import axios from "axios";




export const getUserCartsApi  = createAsyncThunk<CartItem[] | null, number>(
    "getUserActiveCartApi",
    async (user_id) => {
      try {
        
        const response = await axios.get(`/api/carts/get-user-carts/${user_id}`);
        const { ok, results } = response.data;
        
        if (!ok) {
          throw new Error("Invalid credentials getUserCartsApi()");
        }
        return results;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );