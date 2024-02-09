import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LogoutResponse {
  ok: boolean;
  // other properties if any
}

// Allow TypeScript to infer the type for logOutUserApi automatically
export const logOutUserApi = createAsyncThunk<void>(
  'delete-token',
  async () => {
    try {
      const response = await axios.delete<LogoutResponse>("/api/users/delete-token");
      const { ok } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials deleteTokenApi()");
      }
      // No need to return anything here or return some specific data if needed
    } catch (error) {
      console.error(error) // this is temporary
      throw error; // Rethrow the error to let Redux Toolkit handle rejection
    }
  }
);
