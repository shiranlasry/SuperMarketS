import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';

const Home: React.FC = () => {
  const navigate=useNavigate();
  return (
    <div>
      <NavBar />
      <h2>Home</h2>

     <button onClick={()=>navigate("/register")}>Register</button>
    </div>
  );
};

export default Home;
