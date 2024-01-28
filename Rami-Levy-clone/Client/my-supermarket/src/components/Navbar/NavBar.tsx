import React from 'react';
import NavbarItem from '../NavBarItem/NavBarItem';
import "./navBar.scss"

const NavBar: React.FC = () => {
  return (
    <div
      role="navigation"
      aria-label="תפריט מחלקות החנות"
      className="navbar navbar-app nav-menu rl-transition is-not-accessibility"
    >
      <div className="container-fluid">
        <ul id="main-menu" className="menu d-lg-flex showMenu justify-content-between ml-auto">
          {/* Example usage of NavbarItem 1 */}
          <NavbarItem
            label="פירות וירקות"
            iconSrc="/images/menu/blue-icons/49.svg"
            activeIconSrc="/images/menu/colorful-icons/49.svg"
            to="/fruits"
          />

          <NavbarItem
            label="חלב ביצים וסלטים"
            iconSrc="/assets/icons/inactive/dairy-inactive.svg"
            activeIconSrc="/images/menu/colorful-icons/49.svg"
            to="/dairy"
          />
          {/* Add more NavbarItem components as needed */}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
