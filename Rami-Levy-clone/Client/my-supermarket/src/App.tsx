import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
import './App.css'
import Register from './pages/Register/Register';
import Login from './pages/LogIn/Login';

function App() {
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
    {path:"/register",element:<Register/>}
    ,{path:"/login",element:<Login/>}
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
