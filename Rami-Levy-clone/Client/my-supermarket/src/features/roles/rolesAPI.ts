import { createAsyncThunk } from "@reduxjs/toolkit";
import {  Role } from "../../rami-types";
import axios from "axios";

export const getAllRolesAPI = createAsyncThunk<Role[]|null >(
    "getAllRolesAPI",
    async () => {
     try {
        const response = await axios.get("/api/roles/");
        const { ok, results } = response.data;
       
        if (!ok) {
          throw new Error("Invalid credentials getAllRolesAPI()");
        }
        return results;
        
     } catch (error) {
        console.error(error)
        return null
     }
    }

)