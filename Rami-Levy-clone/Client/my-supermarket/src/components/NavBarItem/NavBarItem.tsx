// NavbarItem.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarItem.scss";
import SubCatagoryManu from "../SubCatagoryManu/SubCatagoryManu";

type NavbarItemProps = {
  item: any; // Adjust the type according to your item structure
};

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const { label, icon_src: iconSrc, active_icon_src: activeIconSrc, navbar_item_id, to } = item;
  const [isActive, setIsActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const [isStati, setIsStati] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty dependency array means this effect runs once on mount
  useEffect(() => {
    let timerId: number | undefined;
  
    if (isActive) {
      timerId = window.setTimeout(() => {
        setIsStati(true);
      }, 500);
    } else {
      // Clear the timer if isActive becomes false
      window.clearTimeout(timerId);
      setIsStati(false);
    }
  
    // Cleanup function to clear the timer when the component unmounts
    return () => {
      window.clearTimeout(timerId);
    };
  }, [isActive]);
  


  return (
    <li className={`nav-item${isActive ? " active" : ""}`}>
      <Link
        to={to}
        className={`nav-link${isActive ? " active" : ""}`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => {
          setIsActive(false);
          setIsStati(false);
        }}
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
      {isActive && isStati ? <SubCatagoryManu key={label} navbar_item_id={navbar_item_id} /> : <></>}
    </li>
  );
};

export default NavbarItem;
