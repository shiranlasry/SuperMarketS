import "./user-menu.scss";
import { logOutUserApi } from "../../features/logged_out_user/logOutUserApi";
import { User } from "../../rami-types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";

interface UserMenuProps {
  loggedInUser: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ loggedInUser }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUserApi());
  };

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="user-menu">
      <ul>
        <li><a href="#">הפרופיל שלי</a></li>
        <li><a href="#">ניהול כתובות</a></li>
        <li><a href="#">תשלום</a></li>
        <li><a href="#">ההזמנות שלי</a></li>
        <li><a href="#">מרכז מידע</a></li>
        <li><a href="#">קופה</a></li>
        {loggedInUser?.role_id === 1 && (
          <li>
            <button className="uMenu-admin" onClick={handleNavigateToAdmin}>מסך מנהל</button>
          </li>
        )}
        <li className="uMenu-logout" onClick={handleLogOut}>
          <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            width="15.46"
            height="17.5"
            viewBox="0 0 15.46 17.5"
            className="logout-svg"
          >
            <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            width="15.46"
            height="17.5"
            viewBox="0 0 15.46 17.5"
            className="logout-svg"
          >
            <polyline
              data-v-6f1b17ad=""
              points="8.91 17 14.96 17 14.96 0.5 8.91 0.5"
              fill="none"
              stroke="#e30a00"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></polyline>
            <polyline
              data-v-6f1b17ad=""
              points="7.89 12.99 11.47 9.41 7.89 5.83"
              fill="none"
              stroke="#e30a00"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></polyline>
            <line
              data-v-6f1b17ad=""
              x1="11.26"
              y1="9.41"
              x2="0.5"
              y2="9.41"
              fill="none"
              stroke="#e30a00"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></line>
          </svg>
          </svg>
          <a className="eMenu-logout-title" href="#">
            התנתק/י
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
