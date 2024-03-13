import "./user-menu.scss";
import { User } from "../../rami-types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { logOutUserApi } from "../../features/logged_in_user/loggedInUserAPI";
import { useEffect, useRef } from "react";

interface UserMenuProps {
  loggedInUser: User | null;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ loggedInUser, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the menu if click is outside the menu
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLogOut = () => {
    dispatch(logOutUserApi());
    onClose();
    navigate("/");
  };

  const handleNavigateToAdmin = () => {
    onClose();
    navigate("/admin");
   
  };
  const handleNavigatePersonalProfil = () => {
    onClose();
    const btn = "userDetails";
    navigate(`/personal_profil/${btn}`);
  };
  const handleNavigateUserAddress = () => {
    onClose();
    const btn = "userAddress";
    navigate(`/personal_profil/${btn}`);
  };

  const handleNavigateToaddPaymentMethod = () => {
    onClose();
    const btn = "addPaymentMethod";
    navigate(`/personal_profil/${btn}`);
  };

  const handleNavigateToOrders = () => {
    onClose();
    const btn = "orders";
    navigate(`/personal_profil/${btn}`);
  };

  const handleNavigateToInfoCenter = () => {
    onClose();
    const btn = "InfoCenter";
    navigate(`/personal_profil/${btn}`);
  };

  return (
    <div className="user-menu" ref={userMenuRef}>
      <ul>
        <li>
          <svg
            data-v-c9960dd8=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="21.84"
            height="24.52"
            viewBox="0 0 21.84 24.52"
            class="stroke-width-1"
          >
            <defs data-v-c9960dd8="">
              <clipPath
                data-v-c9960dd8=""
                id="a"
                transform="translate(-1.99 -0.65)"
              >
                <rect
                  data-v-c9960dd8=""
                  width="25.82"
                  height="25.82"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <circle
              data-v-c9960dd8=""
              cx="10.93"
              cy="6.15"
              r="5.65"
              fill="none"
              stroke="#0079f2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></circle>
            <path
              data-v-c9960dd8=""
              d="M12.92,24.67a14.74,14.74,0,0,0,9.71-3.89A2.22,2.22,0,0,0,23,17.93a11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.92,24.67Z"
              transform="translate(-1.99 -0.65)"
              fill="none"
              stroke="#0079f2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          {loggedInUser && (
            <a
              onClick={handleNavigatePersonalProfil}
              href="#"
            >{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</a>
          )}
        </li>
        <li>
          <svg
            data-v-0c15fc4e=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="15.12"
            height="22.86"
            viewBox="0 0 15.12 22.86"
          >
            <defs data-v-0c15fc4e="">
              <clipPath
                data-v-0c15fc4e=""
                id="a"
                transform="translate(-7.64 -3.77)"
              >
                <rect
                  data-v-0c15fc4e=""
                  width="30.39"
                  height="30.39"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <path
              data-v-0c15fc4e=""
              d="M15.2,26.63c-2.65,0-7.56-7.87-7.56-15.3a7.56,7.56,0,0,1,15.12,0C22.76,18.76,17.84,26.63,15.2,26.63Zm0-21.86a6.56,6.56,0,0,0-6.56,6.56c0,7.18,4.82,14.3,6.56,14.3s6.56-7.12,6.56-14.3A6.57,6.57,0,0,0,15.2,4.77Z"
              transform="translate(-7.64 -3.77)"
              fill="#0079f2"
            ></path>
            <path
              data-v-0c15fc4e=""
              d="M15.2,16.64a5.4,5.4,0,1,1,5.4-5.4A5.41,5.41,0,0,1,15.2,16.64Zm0-9.8a4.4,4.4,0,1,0,4.4,4.4A4.4,4.4,0,0,0,15.2,6.84Z"
              transform="translate(-7.64 -3.77)"
              fill="#0079f2"
            ></path>
          </svg>
          <a onClick={handleNavigateUserAddress} href="#">
            ניהול כתובות
          </a>
        </li>
        <li>
          <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24.59"
            height="16.43"
            viewBox="0 0 24.59 16.43"
          >
            <defs data-v-6f1b17ad="">
              <clipPath
                data-v-6f1b17ad=""
                id="a"
                transform="translate(-2.9 -6.98)"
              >
                <rect
                  data-v-6f1b17ad=""
                  width="30.39"
                  height="30.39"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>{" "}
            <path
              data-v-6f1b17ad=""
              d="M24.45,7H5.94a3.05,3.05,0,0,0-3,3V20.37a3,3,0,0,0,3,3H24.45a3,3,0,0,0,3-3V10A3,3,0,0,0,24.45,7ZM5.94,8H24.45a2,2,0,0,1,2,2v1.1H3.9V10A2,2,0,0,1,5.94,8ZM24.45,22.41H5.94a2,2,0,0,1-2-2V12.12H26.49v8.25A2,2,0,0,1,24.45,22.41Z"
              transform="translate(-2.9 -6.98)"
              fill="#0079f2"
            ></path>
          </svg>
          <a onClick={handleNavigateToaddPaymentMethod} href="#">
            תשלום
          </a>
        </li>
        <li>
          <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="23.22"
            height="21.04"
            viewBox="0 0 23.22 21.04"
          >
            <defs data-v-6f1b17ad="">
              <clipPath
                data-v-6f1b17ad=""
                id="a"
                transform="translate(-3.59 -4.68)"
              >
                <rect
                  data-v-6f1b17ad=""
                  width="30.39"
                  height="30.39"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>{" "}
            <path
              data-v-6f1b17ad=""
              d="M6.19,16.94a.51.51,0,0,1-.36-.15L3.73,14.7A.5.5,0,1,1,4.44,14l1.75,1.74L7.93,14a.5.5,0,1,1,.71.71l-2.1,2.09A.5.5,0,0,1,6.19,16.94Z"
              transform="translate(-3.59 -4.68)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M16.25,25.72a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5A9.52,9.52,0,1,0,6.69,15.2a.51.51,0,0,1-.5.5.5.5,0,0,1-.5-.5A10.56,10.56,0,1,1,16.25,25.72Z"
              transform="translate(-3.59 -4.68)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M19.43,20.11a.47.47,0,0,1-.35-.15l-3.81-3.79a.51.51,0,0,1-.15-.35V8.68a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v6.93l3.66,3.64a.5.5,0,0,1,0,.71A.47.47,0,0,1,19.43,20.11Z"
              transform="translate(-3.59 -4.68)"
              fill="#0079f2"
            ></path>
          </svg>
          <a onClick={handleNavigateToOrders} href="#">
            ההזמנות שלי
          </a>
        </li>
        <li>
          <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="4.41"
            height="21.92"
            viewBox="0 0 4.41 21.92"
          >
            <defs data-v-6f1b17ad="">
              <clipPath
                data-v-6f1b17ad=""
                id="a"
                transform="translate(-12.99 -4.24)"
              >
                <rect
                  data-v-6f1b17ad=""
                  width="30.39"
                  height="30.39"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>{" "}
            <path
              data-v-6f1b17ad=""
              d="M15.2,26.16A2.12,2.12,0,0,1,13.08,24V12.69a2.12,2.12,0,1,1,4.23,0V24A2.12,2.12,0,0,1,15.2,26.16Zm0-14.59a1.12,1.12,0,0,0-1.12,1.12V24a1.12,1.12,0,1,0,2.23,0V12.69A1.12,1.12,0,0,0,15.2,11.57Z"
              transform="translate(-12.99 -4.24)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M15.2,8.65a2.21,2.21,0,1,1,2.2-2.21A2.21,2.21,0,0,1,15.2,8.65Zm0-3.41a1.21,1.21,0,1,0,1.2,1.2A1.21,1.21,0,0,0,15.2,5.24Z"
              transform="translate(-12.99 -4.24)"
              fill="#0079f2"
            ></path>
          </svg>
          <a onClick={handleNavigateToInfoCenter} href="#">
            מרכז מידע
          </a>
        </li>

        {loggedInUser?.role_id === 1 && (
          <li>
            <svg
              data-v-c9960dd8=""
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="22.58"
              height="24.52"
              viewBox="0 0 22.58 24.52"
              class="stroke-width-1"
            >
              <defs data-v-c9960dd8="">
                <clipPath
                  data-v-c9960dd8=""
                  id="a"
                  transform="translate(-1.62 -0.65)"
                >
                  <rect
                    data-v-c9960dd8=""
                    width="25.82"
                    height="25.82"
                    fill="none"
                  ></rect>
                </clipPath>
              </defs>
              <circle
                data-v-c9960dd8=""
                cx="10.93"
                cy="6.15"
                r="5.65"
                fill="none"
                stroke="#0079f2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></circle>
              <path
                data-v-c9960dd8=""
                d="M12.55,24.67a14.74,14.74,0,0,0,9.71-3.89,2.21,2.21,0,0,0,.33-2.85,11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.55,24.67Z"
                transform="translate(-1.62 -0.65)"
                fill="none"
                stroke="#0079f2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <line
                data-v-c9960dd8=""
                x1="17.22"
                y1="2.93"
                x2="22.08"
                y2="2.93"
                fill="none"
                stroke="#0079f2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></line>
              <line
                data-v-c9960dd8=""
                x1="19.65"
                y1="0.5"
                x2="19.65"
                y2="5.37"
                fill="none"
                stroke="#0079f2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></line>
            </svg>
            <button className="uMenu-admin" onClick={handleNavigateToAdmin}>
              מסך מנהל
            </button>
          </li>
        )}
        <li className="uMenu-cashier">
          <svg
            data-v-6f1b17ad=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="26"
            height="17"
            viewBox="0 0 26 17"
          >
            <defs data-v-6f1b17ad="">
              <clipPath
                data-v-6f1b17ad=""
                id="a"
                transform="translate(-2.2 -6.7)"
              >
                <rect
                  data-v-6f1b17ad=""
                  width="30.39"
                  height="30.39"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>{" "}
            <path
              data-v-6f1b17ad=""
              d="M12.92,11a.49.49,0,0,1-.35-.15.51.51,0,0,1-.15-.35,3.8,3.8,0,0,1,3.8-3.79h8.14a3.79,3.79,0,0,1,3.79,3.79.5.5,0,0,1-.5.5Zm.55-1H27.11A2.8,2.8,0,0,0,24.36,7.7H16.22A2.8,2.8,0,0,0,13.47,10Z"
              transform="translate(-2.2 -6.7)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M17.46,23.7H2.7a.5.5,0,0,1-.5-.5A10.75,10.75,0,0,1,12.93,12.46h6.86v-2a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5V13a.5.5,0,0,1-.5.5H12.93A9.75,9.75,0,0,0,3.21,22.7H17.46a.5.5,0,0,1,0,1Z"
              transform="translate(-2.2 -6.7)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M27.7,23.7H17.46a.5.5,0,0,1-.5-.5A10.75,10.75,0,0,1,27.7,12.46a.51.51,0,0,1,.5.5V23.2A.5.5,0,0,1,27.7,23.7ZM18,22.7H27.2V13.48A9.74,9.74,0,0,0,18,22.7Z"
              transform="translate(-2.2 -6.7)"
              fill="#0079f2"
            ></path>
            <path
              data-v-6f1b17ad=""
              d="M14.42,20.83H6.58a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5h7.84a.5.5,0,0,1,.5.5A.51.51,0,0,1,14.42,20.83Z"
              transform="translate(-2.2 -6.7)"
              fill="#0079f2"
            ></path>
          </svg>
          <a href="#">קופה</a>
        </li>
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
          <a
            className="eMenu-logout-title"
            href="#"
            title="לחץ להתנתקות"
            data-toggle="tooltip"
            data-placement="bottom"
          >
            התנתק/י
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
