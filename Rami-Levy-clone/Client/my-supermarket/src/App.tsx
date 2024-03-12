import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import CategoryVisual from "./components/catagoryVisual/catagoryVisual";
import ErrorPage from "./pages/404-page/ErrorPage";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import AddNewFoodCategory from "./pages/Admin/ProductAdmin/AddNewFoodCategory/AddNewFoodCategory";
import AddNewProduct from "./pages/Admin/ProductAdmin/AddNewProduct/AddNewProduct";
import ProductsAdmin from "./pages/Admin/ProductAdmin/ProductAdmin";
import UpdateUser from "./pages/Admin/UsesManage/tsx/UpdateUser";
import UsersManage from "./pages/Admin/UsesManage/tsx/UsersManage";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import PersonalProfil from "./pages/PersonalProfil/PersonalProfil";
import Register from "./pages/Register/Register";
import Layout from "./views/layouts/Layout";
import NavBarItemProducts from "./components/NavBarItem/NavBarItemProducts/NavBarItemProducts";
import UserOrders from "./pages/PersonalProfil/UserOrders/UserOrders";
import ProductsByFoodCategory from "./components/ProductsByFoodCategory/ProductsByFoodCategory";
import CheckOutOffers from "./components/CheckOutOffers/CheckOutOffers";
import SalesList from "./components/SalesList/SalesList";
import ManageSales from "./pages/Admin/ManageSales/ManageSales";
import OrderSummary from "./components/OrderSummary/OrderSummary";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register onClose={() => {}} /> },
        {
          path: "/login",
          element: <Login onClose={() => {}} RegisterPressed={() => {}} />,
        },

        { path: "/admin", element: <AdminMainPage /> },
       
        { path: "/manage_users", element: <UsersManage /> },
        { path: "/manage_products", element: <ProductsAdmin /> },
        { path: "/update_user", element: <UpdateUser /> },
        { path: "/category-visual/:id", element: <CategoryVisual /> },
        { path: "/*", element: <ErrorPage /> },
     
        { path: "/personal_profil", element: <PersonalProfil /> },
        {
          path: "/navbar_item_products/:navbar_item_id",
          element: <NavBarItemProducts />,
        },
        { path: "/user_orders", element: <UserOrders /> },

        {
          path: "/navbar_item_products/:navbar_item_id/:title",
          element: <NavBarItemProducts />,
        },
        {
          path: "/products_by_food_category/:food_category_id/",
          element: <ProductsByFoodCategory />,
        },
        {path:"/navbar_item_products/:navbar_item_id/:title" , element :<NavBarItemProducts/>},
        {path:"/products_by_food_category/:food_category_id/" , element :<ProductsByFoodCategory/>},
        {path:"/check_out_offers" , element :<CheckOutOffers/>},
        { path: "/products_by_food_category/:food_category_id/", element: <ProductsByFoodCategory /> },
        {path:"/sales" , element :<SalesList/>},
        {
          path: "/navbar_item_products/:navbar_item_id/:title",
          element: <NavBarItemProducts />,
        },
        {
          path: "/products_by_food_category/:food_category_id/",
          element: <ProductsByFoodCategory />,
        },
        { path: "/check_out_offers", element: <CheckOutOffers /> },
        { path: "/manage_sales", element: <ManageSales />},
        {
          path: "/order-summary/:order_id",
          element: <OrderSummary />,
        },

      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
