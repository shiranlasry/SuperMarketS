import React from 'react';
import './home.scss'
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';

const Home: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
 
  return (
    <div>
      <Layout>
        <div className="home-container">
          <div className="home-content">
            <h1>ברוך הבא לרמי לוי</h1>
            <p>הקניון שלך באינטרנט</p>
          </div>
        </div>
      </Layout>
      
      
    </div>
  );
};

export default Home;
