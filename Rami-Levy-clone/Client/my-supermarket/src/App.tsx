import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AddNewAddress from "./pages/PersonalProfil/UserAddress/AddNewAddress/AddNewAddress";
import AddNewProduct from "./pages/Admin/ProductAdmin/AddNewProduct/AddNewProduct";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Register from "./pages/Register/Register";
import UsersManage from "./pages/Admin/UsesManage/tsx/UsersManage";
import ProductsAdmin from "./pages/Admin/ProductAdmin/ProductAdmin";
import ErrorPage from "./pages/404-page/ErrorPage";
import UpdateUser from "./pages/Admin/UsesManage/tsx/UpdateUser";
import CategoryVisual from "./components/catagoryVisual/catagoryVisual";
import AddNewFoodCategory from "./pages/Admin/ProductAdmin/AddNewFoodCategory/AddNewFoodCategory";
import Layout from "./views/layouts/Layout";
import PersonalProfil from "./pages/PersonalProfil/PersonalProfil";
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
        { path: "/add_user_addresses", element: <AddNewAddress /> },
        { path: "/admin", element: <AdminMainPage /> },
        { path: "/add_new_product", element: <AddNewProduct /> },
        { path: "/manage_users", element: <UsersManage /> },
        { path: "/manage_products", element: <ProductsAdmin /> },
        { path: "/update_user", element: <UpdateUser /> },
        { path: "/category-visual/:id", element: <CategoryVisual /> },
        { path: "/*", element: <ErrorPage /> },
        { path: "/add_new_food_category", element: <AddNewFoodCategory /> },
        {path:"/personal_profil" , element :<PersonalProfil/>}
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
