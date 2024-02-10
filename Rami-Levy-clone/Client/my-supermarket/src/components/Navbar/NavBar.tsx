// NavBar.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
// import { navbarItems } from '../../constants/NavbarItems';
import NavbarItem from '../NavBarItem/NavBarItem';
import "./navBar.scss";
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { navBarItemsSelector } from '../../features/navbar_items/navbarItemsSlise';
import { getAllNavBarItemsApi } from '../../features/navbar_items/navbarItemsAPI';

const NavBar: React.FC = () => {
  //get all the items svg from redux
  const navbarItemsDB = useAppSelector(navBarItemsSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    
    dispatch(getAllNavBarItemsApi());
  }, []);
  
  return (
    <div
      role="navigation"
      aria-label="תפריט מחלקות החנות"
      className="navbar navbar-app nav-menu rl-transition is-not-accessibility col-8"
    >
      <div className="container-fluid">
        <ul id="main-menu" className="menu d-lg-flex showMenu justify-content-center d-flex ml-auto">
          {navbarItemsDB && navbarItemsDB.map((item, index) => (
            <NavbarItem key={index} item={item} />
          ))}
        </ul>
      </div>

    </div>
  );
};

export default NavBar;
