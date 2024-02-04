// layout.tsx

import React, { useState } from 'react';
import NightMode from '../NightMode/NightMode';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import { useNavigate } from 'react-router-dom';
import { logOutUserApi } from '../../features/logged_in_user/loggedInUserAPI';
import Login from '../../pages/LogIn/Login';
import NavBar from '../Navbar/NavBar';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import ShoppingBasket from '../ShoppingBasket/ShoppingBasket';
import Register from '../../pages/Register/Register';
// import ShoppingCart from './ShoppingCart';
// import ShoppingBasket from './ShoppingBasket';
// import Footer from './Footer';


const Layout: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector)
  const [isloginpressed, setIsloginpressed] = useState(false);
  const[isRegisterPressed,setisRegisterPressed]=useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handelRgisterPressed=()=>{
    setisRegisterPressed(true);
    setIsloginpressed(false);
  }
  const handelLogOut = () => {
    dispatch(logOutUserApi());

  }
  const handelCloseLogin = () => {
    setIsloginpressed(false);
  }
  const handelCloseRegister = () => {
    setisRegisterPressed(false);
  }
  return (
    <div className="app-container">
      <button className='to-main-navBar'>
        <img className='rami-online' src='./src/assets/logos/rami-levy-online.png' />
      </button>
      <button className='to-shoppin-navBar'>
        <img className='rami-shopping' src='./src/assets/logos/rami-levy-shopping.png' />
      </button>
      <NightMode />
      <button className='access'>הצהרת נגישות</button>

      {
        !loggedInUser && <>
          {/* <button className='hp-regBtn' onClick={() => navigate("/register")}>הרשם</button> */}

          <button className='hp-loginBtn' onClick={() => setIsloginpressed(true)}><svg data-v-c9960dd8="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.84" height="24.52" viewBox="0 0 21.84 24.52" className="hp-loginSvg"><defs data-v-c9960dd8=""><clipPath data-v-c9960dd8="" id="a" transform="translate(-1.99 -0.65)"><rect data-v-c9960dd8="" width="25.82" height="25.82" fill="none"></rect></clipPath></defs><circle data-v-c9960dd8="" cx="10.93" cy="6.15" r="5.65" fill="none" stroke="#0079f2" stroke-linecap="round" stroke-linejoin="round"></circle><path data-v-c9960dd8="" d="M12.92,24.67a14.74,14.74,0,0,0,9.71-3.89A2.22,2.22,0,0,0,23,17.93a11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.92,24.67Z" transform="translate(-1.99 -0.65)" fill="none" stroke="#0079f2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span className='login-title'> התחברות</span></button>
        </>
      }{
        loggedInUser && <>
          <p>hello {loggedInUser.first_name}</p>
          <button onClick={handelLogOut}>התנתקות</button>
          <button onClick={() => navigate("/add_user_addresses")}>הוספת כתובת למשלוח</button>
        </>


      }
       <NavBar /> 
       <ShoppingCart/>
       <ShoppingBasket/>
      {
        isloginpressed && 
        <>
          <Login onClose={handelCloseLogin} RegisterPressed={handelRgisterPressed}/>
        </>
      }
      {
        isRegisterPressed && 
        <>
          <Register onClose={handelCloseRegister}/>
        </>
      }
    </div>
  );
};

export default Layout;
