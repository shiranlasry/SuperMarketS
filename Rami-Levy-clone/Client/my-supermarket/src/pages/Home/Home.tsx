import React from 'react';
import './home.scss'
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';

const Home: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
 
  return (
    <div>
      <Layout/> 
      
    </div>
  );
};

export default Home;
