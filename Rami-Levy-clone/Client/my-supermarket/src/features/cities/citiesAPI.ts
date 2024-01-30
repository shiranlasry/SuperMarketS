import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../../rami-types";
import axios from "axios";

export const getAllCitiesAPI = createAsyncThunk<City[]|null >(
    "getAllCitiesAPI",
    async () => {
     try {
        const response = await axios.get("/api/cities/");
        const { ok, results } = response.data;
       
        if (!ok) {
          throw new Error("Invalid credentials getAllUsersAPI()");
        }
        return results;
        
     } catch (error) {
        console.error(error)
        return null
     }
    }

)