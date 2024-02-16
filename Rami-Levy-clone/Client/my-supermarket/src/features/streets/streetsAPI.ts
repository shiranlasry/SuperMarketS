import { createAsyncThunk } from "@reduxjs/toolkit";
import {  Street } from "../../rami-types";
import axios from "axios";

export const getAllStreetsAPI = createAsyncThunk<Street[]|null >(
    "getAllStreetsAPI",
    async () => {
     try {
        const response = await axios.get("/api/streets/");
        const { ok, results } = response.data;
       
        if (!ok) {
          throw new Error("Invalid credentials getAllStreetsAPI()");
        }
        return results;
        
     } catch (error) {
        console.error(error)
        return null
     }
    }

)