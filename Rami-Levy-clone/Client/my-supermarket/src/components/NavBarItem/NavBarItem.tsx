// NavbarItem.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarItem.scss";

type NavbarItemProps = {
  item: any; // Adjust the type according to your item structure
};

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const { label, icon_src: iconSrc, active_icon_src: activeIconSrc, to } = item;
  const [isActive, setIsActive] = useState(false);
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

  return (
    <li className={`nav-item${isActive ? " active" : ""}`}>
      <Link
        to={to}
        className={`nav-link${isActive ? " active" : ""}`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
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
      </Link>
    </li>
  );
};

export default NavbarItem;
