import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  to: string;
  label: string;
  iconSrc: string;
  activeIconSrc: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, label, iconSrc, activeIconSrc }) => {
  return (
    <li className="focus-item item d-xl-table-c position-relative">
      <Link to={to} className="focus-item li-menu-title height-transition d-lg-block d-flex align-items-center align-top py-2 py-lg-3 w-100 border-radius-8 is-hover">
        <img alt="" src={iconSrc} width="28" height="28" className="online-menu-img" />
        <div className="li-menu-title-text d-flex justify-content-center align-items-center d-lg-block mobile-fix px-2 px-lg-0 py-1 line-height-1 pt-2">
          <div className="d-name department px-1 w-100 align-self-center my-2 my-lg-0 s-text">
            {label}
          </div>
        </div>
      </Link>
      <ul className="focus-item ul-wrap-category border-radius-bottom-15 rl-scroll rl-group-wrap hidden row no-gutters pt-lg-3 px-lg-2 pb-2 categoies-list right-0 left-0 bg-gray-100 overflow-y-scroll-n">
        {/* Submenu items go here */}
      </ul>
    </li>
  );
};

export default NavbarItem;
