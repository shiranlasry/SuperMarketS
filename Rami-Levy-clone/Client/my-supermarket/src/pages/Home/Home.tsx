import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/other">Go to Other Page</Link>
    </div>
  );
};

export default Home;
