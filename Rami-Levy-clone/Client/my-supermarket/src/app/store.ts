import { configureStore } from "@reduxjs/toolkit";
import allUsersReducer from "../features/all_users_admin/allUsersSlice";
import cartReducer from "../features/cart/cartSlice"; // Adjust the path based on your project structure
import categoriesReducer from "../features/categories/categoriesSlice";
import citiesReducer from "../features/cities/citiesSlice";
import deliveriesReducer from "../features/deliveries/allDeliveriesSlice";
import loggesInUserReducer from "../features/logged_in_user/loggedInUserSlice";
import navbarReducer from "../features/navbar_items/navbarItemsSlice";
import ordersReducer from "../features/orders/ordersSlice";
import productsReducer from "../features/products/productsSlice";
import roleRducer from "../features/roles/rolesSlice";
import salesReducer from "../features/sales/salesSlice";
import streetsReducer from "../features/streets/streetsSlice";

export const store = configureStore({
  reducer: {
    loggedInUser: loggesInUserReducer,
    allUsers: allUsersReducer,
    cities: citiesReducer,
    streets: streetsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    navbarItems: navbarReducer,
    roles: roleRducer,
    orders: ordersReducer,
    cart: cartReducer, // Include the cart reducer here
    sales: salesReducer,
    deliveries: deliveriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
