//homepage tsx

import React from 'react';
import { useAppSelector } from '../../app/hook';
import Layout from '../../components/Layout/Layout';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import './home.scss';

const Home: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
 
  return (
    <div>
      <Layout>
      <h1>This is home page need to display products by categories here</h1>
    </Layout>
  
    </div>
  );
};

export default Home;
