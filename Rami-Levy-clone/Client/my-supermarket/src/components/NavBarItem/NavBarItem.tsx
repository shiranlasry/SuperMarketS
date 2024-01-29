// NavbarItem.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbarItem.scss";


type NavbarItemProps = {
  // label: string;
  // iconSrc: string;
  // activeIconSrc: string;
  // to: string;
  item: any //type
};

const NavbarItem: React.FC<NavbarItemProps> = ({item}) => {
  const { label, iconSrc, activeIconSrc, to } = item
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
