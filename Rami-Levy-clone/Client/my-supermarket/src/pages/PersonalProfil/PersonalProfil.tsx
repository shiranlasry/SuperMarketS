import { useSelector } from "react-redux";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import "./PersonalProfil.scss";
import { useState } from "react";
import UserDetails from "./UserDetails/UserDetails";
import UserAddress from "./UserAddress/UserAddress";

const PersonalProfil = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserAddress, setShowUserAddress] = useState(false);
  const setAllFalse = () => {
    setShowUserDetails(false);
    setShowUserAddress(false);
  };
  return (
    <div className="Personal-profil-container">
      <div className="Personal-profil-menu">
        <button
          onClick={() => {
            setAllFalse();
            setShowUserDetails(true);
          }}
        >
          פרטים אישיים
        </button>
        <button
          onClick={() => {
            setAllFalse();
            setShowUserAddress(true);
          }}
        >
          ניהול כתובות
        </button>
        <button>תשלום</button>
        <button>ההזמנות שלי</button>
        <button>מרכז מידע</button>
        <button>מרכז המידע </button>
        <button>קופה</button>
        <button className="log-out-user">התנתקות</button>
      </div>
      <div className="Personal-profil-details">
        {/* need to render here the user details Depends on the user's selection in the menu */}
        {showUserDetails && <UserDetails />}
        {showUserAddress && <UserAddress />}
      </div>
      <div className="Personal-profil-lists"></div>
    </div>
  );
};

export default PersonalProfil;
