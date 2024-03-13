import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { City } from "../../rami-types";

export const getAllCitiesAPI = createAsyncThunk<City[] | null>(
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
      console.error(error);
      return null;
    }
  }
);
