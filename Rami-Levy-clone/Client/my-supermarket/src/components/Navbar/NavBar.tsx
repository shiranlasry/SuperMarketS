// NavBar.tsx
import React from 'react';
import NavbarItem from '../NavBarItem/NavBarItem';
import "./navBar.scss";

const NavBar: React.FC = () => {
  const navbarItems = [
    { label:"היסטוריית רכישה", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "מבצעים", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "פירות וירקות", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "חלב ביצים וסלטים", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "בשר ודגים", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "אורגני ובריאות", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "קפואים", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "שימורים בישול ואפיה", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "קטניות ודגנים", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "חטיפים ומתוקים", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "משקאות", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "חד-פעמי ומתכלה", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "אחזקת הבית ובע'ח", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    { label: "פארם ותינוקות", iconSrc: "/assets/icons/inactive/dairy-inactive.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/dairy" },
    { label: "לחם ומאפים טריים", iconSrc: "/images/menu/blue-icons/49.svg", activeIconSrc: "/images/menu/colorful-icons/49.svg", to: "/fruits" },
    // Add more items as needed
  ];

  return (
    <div
      role="navigation"
      aria-label="תפריט מחלקות החנות"
      className="navbar navbar-app nav-menu rl-transition is-not-accessibility"
    >
      <div className="container-fluid">
        <ul id="main-menu" className="menu d-lg-flex showMenu justify-content-between ml-auto">
          {navbarItems.map((item, index) => (
            <NavbarItem key={index} label={item.label} iconSrc={item.iconSrc} activeIconSrc={item.activeIconSrc} to={item.to} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
