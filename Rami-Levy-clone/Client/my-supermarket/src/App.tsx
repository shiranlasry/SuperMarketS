import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AddNewAddress from './components/AddNewAddress/AddNewAddress';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import AdminMainPage from './pages/Admin/AdminMainPage';
import Home from './pages/Home/Home';
import Login from './pages/LogIn/Login';
import Register from './pages/Register/Register';
import UsersManage from './pages/Admin/UsesManage/UsersManage';
import ProductsAdmin from './pages/Admin/ProductAdmin/ProductAdmin';

function App() {
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
    {path:"/register",element:<Register onClose={()=>{}}/>},
    {path:"/login",element:<Login onClose={()=>{}} RegisterPressed={()=>{}}/>},
    {path:"/add_user_addresses",element:<AddNewAddress/>},
    {path:"/admin",element:<AdminMainPage/>} ,
    {path:"/add_new_product",element:<AddNewProduct/>} ,
    {path:"/manage_users",element:<UsersManage/>},
    {path:"/manage_products",element:<ProductsAdmin/>}
  ])
  return (
    <RouterProvider router={router} />
  )
}

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Add more routes as needed */}
//       </Routes>
//     </Router>
//   );
// };

export default App;
