import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import { logOutUserApi } from '../../features/logged_in_user/loggedInUserAPI';
import './home.scss'
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import ShoppingBasket from '../../components/ShoppingBasket/ShoppingBasket';
import NightMode from '../../components/NightMode/NightMode';

const Home: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handelLogOut = () => {
    dispatch(logOutUserApi());
  
  }
  return (
    <div>
      <button className='to-main-navBar'>
      <img className='rami-online' src='./src/assets/logos/rami-levy-online.png'/>
     </button>
     <button className='to-shoppin-navBar'>
      <img className='rami-shopping' src='./src/assets/logos/rami-levy-shopping.png'/>
     </button>
     <NightMode/>
     <button className='access'>הצהרת נגישות</button>
     
      {
        !loggedInUser && <>
          {/* <button className='hp-regBtn' onClick={() => navigate("/register")}>הרשם</button> */}
          
          <button className='hp-loginBtn' onClick={() => navigate("/login")}><svg data-v-c9960dd8="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.84" height="24.52" viewBox="0 0 21.84 24.52" className="hp-loginSvg"><defs data-v-c9960dd8=""><clipPath data-v-c9960dd8="" id="a" transform="translate(-1.99 -0.65)"><rect data-v-c9960dd8="" width="25.82" height="25.82" fill="none"></rect></clipPath></defs><circle data-v-c9960dd8="" cx="10.93" cy="6.15" r="5.65" fill="none" stroke="#0079f2" stroke-linecap="round" stroke-linejoin="round"></circle><path data-v-c9960dd8="" d="M12.92,24.67a14.74,14.74,0,0,0,9.71-3.89A2.22,2.22,0,0,0,23,17.93a11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.92,24.67Z" transform="translate(-1.99 -0.65)" fill="none" stroke="#0079f2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span className='login-title'> התחברות</span></button>
           

            
        </>
      }
       <NavBar /> 
       <ShoppingCart/>
       <ShoppingBasket/>
       
      {
        loggedInUser && <>
          <p>hello {loggedInUser.first_name}</p>
          <button onClick={handelLogOut}>התנתקות</button>
          <button onClick={() => navigate("/add_user_addresses")}>הוספת כתובת למשלוח</button>
        </>


      }
    </div>
  );
};

export default Home;
