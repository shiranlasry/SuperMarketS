import { createAsyncThunk } from "@reduxjs/toolkit";
import { Delivery } from "../../rami-types";
import axios from "axios";



export const getAllDeliveriesApi = createAsyncThunk<Delivery[]|null >(
    "getAllDeliveriesApi",
    async () => {
     try {
        const response = await axios.get("/api/deliveries/");
        const { ok, results } = response.data;
       
        if (!ok) {
          throw new Error("Invalid credentials getAllDeliveries()");
        }
        return results;
        
     } catch (error) {
        console.error(error)
        return null
     }
    }

)