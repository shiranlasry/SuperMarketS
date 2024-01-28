// NavbarItem.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbarItem.scss"; // Assuming you have a separate SCSS file for styling

type NavbarItemProps = {
  label: string;
  iconSrc: string;
  activeIconSrc: string;
  to: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ label, iconSrc, activeIconSrc, to }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <li className={`nav-item${isActive ? ' active' : ''}`}>
      <Link
        to={to}
        className={`nav-link${isActive ? ' active' : ''}`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="navbar-item-content">
          <img src={isActive ? activeIconSrc : iconSrc} />
          <span>{label}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;
