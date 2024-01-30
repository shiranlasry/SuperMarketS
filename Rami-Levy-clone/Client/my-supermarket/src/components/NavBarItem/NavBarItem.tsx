// NavbarItem.tsx
import React, { useEffect, useState } from 'react';
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

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const { label, iconSrc, activeIconSrc, to } = item;
  const [isActive, setIsActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // empty dependency array means this effect runs once on mount

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
          <img src={isSmallScreen ? activeIconSrc : (isActive ? activeIconSrc : iconSrc)} />
          <span>{label}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;
