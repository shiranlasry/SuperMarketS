import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import { logOutUserApi } from '../../features/logged_in_user/loggedInUserAPI';

const Home: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handelLogOut = () => {
    dispatch(logOutUserApi());
    
  }
  return (
    <div>
      <NavBar />
      <h2>Home</h2>

      {
        !loggedInUser && <>
          <button onClick={() => navigate("/register")}>הרשם</button>
          <button onClick={() => navigate("/login")}>התחבר</button>
        </>
      }
      {
        loggedInUser && <>
          <p>hello {loggedInUser.first_name}</p>
          <button onClick={handelLogOut}>התנתקות</button>
        </>


      }
    </div>
  );
};

export default Home;
