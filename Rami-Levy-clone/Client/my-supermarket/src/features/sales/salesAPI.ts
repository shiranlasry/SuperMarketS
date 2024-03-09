import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Sales } from "../../rami-types";

export const getSalesAPI = createAsyncThunk<Sales[], void>(
  "getSalesAPI",
  async () => {
    try {
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

export const addSaleAPI = createAsyncThunk<Sales, Sales>(
  "addSaleAPI",
  async (newSale) => {
    try {
      const response = await axios.post("/api/sales/add-new-sale", newSale);
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials addSaleAPI()");
      }
      return results as Sales;
    } catch (error) {
      console.error(error);
      return {} as Sales;
    }
  }
);

export const updateSaleAPI = createAsyncThunk<Sales, Sales>(
  "updateSaleAPI",
  async (sale) => {
    try {
      const response = await axios.put(`/api/sales/update-sale/${sale.sale_id}`, sale);
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials updateSaleAPI()");
      }
      return results as Sales;
    } catch (error) {
      console.error(error);
      return {} as Sales;
    }
  }
);

export const deleteSaleAPI = createAsyncThunk<Sales, number>(
  "sales/deleteSaleAPI",
  async (sale_id: number) => {
    try {
      const response = await axios.delete(`/api/sales/delete-sale/${sale_id}`);
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials deleteSaleAPI()");
      }
      return results as Sales;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
);
