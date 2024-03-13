import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FoodCategories, SubFoodCategories } from "../../rami-types";

export const getFoodCategoriesApi = createAsyncThunk<FoodCategories[] | null>(
  "get-all-food-categories",
  async () => {
    try {
      const response = await axios.get("/api/categories/food-categories");
      const { ok, results } = response.data;
      if (!ok) {
        throw new Error("Invalid credentials getAllUsersApi()");
      }

      return results;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const get_SUB_FoodCategoriesApi = createAsyncThunk<
  SubFoodCategories[] | null
>("get-all-sub-food-categories", async () => {
  try {
    const response = await axios.get("/api/categories/sub-food-categories");
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials getAllUsersApi()");
    }

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getCategorybySubCategoryApi = createAsyncThunk<
  number | null,
  { sub_food_category_id: number | null }
>("get-category-by-sub-category", async (sub_food_category_id) => {
  try {
    const response = await axios.get(
      `/api/categories/food-categories/${sub_food_category_id.sub_food_category_id}`
    );
    const { ok, results } = response.data;
    console.log("results in client", results[0]);
    if (!ok) {
      throw new Error("Invalid credentials getAllUsersApi()");
    }

    return results[0];
  } catch (error) {
    console.error(error);
    return null;
  }
});
