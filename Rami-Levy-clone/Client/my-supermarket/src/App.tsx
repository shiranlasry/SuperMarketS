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
        { path: "/add_new_product", element: <AddNewProduct /> },
        { path: "/manage_users", element: <UsersManage /> },
        { path: "/manage_products", element: <ProductsAdmin /> },
        { path: "/update_user", element: <UpdateUser /> },
        { path: "/category-visual/:id", element: <CategoryVisual /> },
        { path: "/*", element: <ErrorPage /> },
        { path: "/add_new_food_category", element: <AddNewFoodCategory /> },
        {path:"/personal_profil" , element :<PersonalProfil/>},
        { path: "/navbar_item_products/:navbar_item_id", element: <NavBarItemProducts /> },
        { path: "/user_orders", element: <UserOrders /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
