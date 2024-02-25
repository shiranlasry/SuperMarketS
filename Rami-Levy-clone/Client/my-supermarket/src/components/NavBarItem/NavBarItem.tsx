// NavbarItem.tsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBarItem.scss";
import SubCategoryMenu from "../SubCategoryMenu/SubCategoryMenu";

type NavbarItemProps = {
  item: any; // Adjust the type according to your item structure
};

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const {
    label,
    icon_src: iconSrc,
    active_icon_src: activeIconSrc,
    navbar_item_id,
    to,
  } = item;
  const [isActive, setIsActive] = useState(false);
  const [selectedNavbarItemID, setSelectedNavbarItemID] = useState<
    number | null
  >(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty dependency array means this effect runs once on mount

  const handleMouseEnter = () => {
    setIsActive(true);
    setSelectedNavbarItemID(navbar_item_id);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setSelectedNavbarItemID(null);
  };

  return (
    <li
      className={`nav-item${isActive ? " active" : ""}`}
      onMouseEnter={handleMouseEnter} // Add mouse enter event handler
      onMouseLeave={handleMouseLeave} // Add mouse leave event handler
    >
      <NavLink
        to={to}
        className={`nav-link${isActive ? " active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="navbar-item-content">
          {/* Render SVG elements based on screen size */}
          {isSmallScreen ? (
            <div dangerouslySetInnerHTML={{ __html: activeIconSrc }} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: isActive ? activeIconSrc : iconSrc,
              }}
            />
          )}
          <span className="nav-category">{label}</span>
        </div>
      </NavLink>
      {isActive && <SubCategoryMenu navbarItemId={selectedNavbarItemID} />}{" "}
      {/* Pass selectedNavbarItemID as prop */}
    </li>
  );
};

export default NavbarItem;
