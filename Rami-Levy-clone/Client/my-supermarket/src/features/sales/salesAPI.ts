import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Sales } from "../../rami-types";

export const getSalesAPI = createAsyncThunk<Sales[], void>(
  "getSalesAPI",
  async () => {
    try {
      console.log("getSalesAPI");
      const response = await axios.get("/api/sales");
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials getSalesAPI()");
      }
      return results as Sales[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

  