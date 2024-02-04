import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
import './App.css'
import Register from './pages/Register/Register';
import Login from './pages/LogIn/Login';
import AddNewAddress from './components/AddNewAddress/AddNewAddress';
import AdminMainPage from './pages/Admin/AdminMainPage';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';

function App() {
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
    {path:"/register",element:<Register onClose={()=>{}}/>},
    {path:"/login",element:<Login onClose={()=>{}} RegisterPressed={()=>{}}/>},
    {path:"/add_user_addresses",element:<AddNewAddress/>},
    {path:"/admin",element:<AdminMainPage/>} ,
    {path:"/add_new_product",element:<AddNewProduct/>} 
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
