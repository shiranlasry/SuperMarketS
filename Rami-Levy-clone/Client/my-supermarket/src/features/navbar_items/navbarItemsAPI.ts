//navbar items api client

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavBarItem } from "../../rami-types";

export const getAllNavBarItemsApi = createAsyncThunk<NavBarItem[] | null, void>(
  "get-all-nav_bar_items",
  async () => {
    try {
      const response = await axios.get("/api/navbar-items");
      const data = response.data;

      if (data.ok) {
        // Save the data into session storage
        sessionStorage.setItem("navbarItems", JSON.stringify(data.results));

        return data.results;
      } else {
        // Handle error if needed
        console.error(data.error);
        return null; // Return null in case of error
      }
    } catch (error) {
      console.error(error);
      return null; // Return null in case of error
    }
  }
);
