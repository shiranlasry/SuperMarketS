import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Adjust the path based on your project structure
import loggesInUserReducer from "../features/logged_in_user/loggedInUserSlice";
import citiesReducer from "../features/cities/citiesSlice";
import streetsReducer from "../features/streets/streetsSlice";
import allUsersReducer from "../features/all_users_admin/allUsersSlice";
import categoriesReducer from "../features/categories/categoriesSlice"
import productsReducer from "../features/products/productsSlice"
import navbarReducer from "../features/navbar_items/navbarItemsSlice"

export const store = configureStore({
  reducer: {
    loggedInUser: loggesInUserReducer,
    allUsers: allUsersReducer,
    cities: citiesReducer,
    streets: streetsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    navbarItems: navbarReducer,
    
    cart: cartReducer, // Include the cart reducer here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;