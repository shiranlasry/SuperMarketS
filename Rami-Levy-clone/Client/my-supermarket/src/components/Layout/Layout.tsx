import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NightMode from "../NightMode/NightMode";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { useNavigate } from "react-router-dom";
import { logOutUserApi } from "../../features/logged_in_user/loggedInUserAPI";
import Login from "../../pages/LogIn/Login";
import NavBar from "../Navbar/NavBar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ShoppingBasket from "../ShoppingBasket/ShoppingBasket";
import "bootstrap/dist/css/bootstrap.min.css";
import { User } from "../../rami-types";
import "./layout.scss";
import Register from "../../pages/Register/Register";

const Layout: React.FC = () => {
  const loggedInUser: User | null = useAppSelector(loggedInUserSelector);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (showRegisterModal) {
      setShowLoginModal(false);
    }
  }, [showRegisterModal]);

  const handelLogOut = () => {
    dispatch(logOutUserApi());
  };

  // State to control the visibility of login modal
  const handelCloseLogin = () => {
    // Close the login modal
    setShowLoginModal(false);
  };
  const handelCloseRegister = () => {
    // Close the register modal
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="app-container">
      <button className="to-main-navBar">
        <img
          className="rami-online"
          src="./src/assets/logos/rami-levy-online.png"
        />
      </button>
      <button className="to-shoppin-navBar">
        <img
          className="rami-shopping"
          src="./src/assets/logos/rami-levy-shopping.png"
        />
      </button>
      <NightMode />
      <button className="access">הצהרת נגישות</button>

      {loggedInUser && (
        <div className="greet-user">
          <svg
            data-v-c9960dd8=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="21.84"
            height="24.52"
            viewBox="0 0 21.84 24.52"
            className="loggedin-Svg"
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
          {loggedInUser.first_name}

          <button className="logout-btn" onClick={handelLogOut}>
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
                stroke-linecap="round"
                stroke-linejoin="round"
              ></polyline>
              <polyline
                data-v-6f1b17ad=""
                points="7.89 12.99 11.47 9.41 7.89 5.83"
                fill="none"
                stroke="#e30a00"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></polyline>
              <line
                data-v-6f1b17ad=""
                x1="11.26"
                y1="9.41"
                x2="0.5"
                y2="9.41"
                fill="none"
                stroke="#e30a00"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></line>
            </svg>
          </button>
          {/* <button onClick={() => navigate("/add_user_addresses")}>
            הוספת כתובת למשלוח
          </button> */}
          {loggedInUser.role_id === 1 && (
            <button
              className="go-to-adminBtn"
              onClick={() => navigate("/admin")}
            >
              מסך מנהל
            </button>
          )}
        </div>
      )}

      {!loggedInUser && (
        <>
          <button
            className="hp-loginBtn"
            onClick={() => setShowLoginModal(true)}
          >
            <svg
              data-v-c9960dd8=""
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="21.84"
              height="24.52"
              viewBox="0 0 21.84 24.52"
              className="hp-loginSvg"
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
            <span className="login-title"> התחברות</span>
          </button>
        </>
      )}

      <NavBar />
      <ShoppingCart />
      <ShoppingBasket />

      {!loggedInUser && (
        <Modal
          show={showLoginModal}
          onHide={handelCloseLogin}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <Login
              onClose={handelCloseLogin}
              RegisterPressed={() => setShowRegisterModal(true)}
            />
          </Modal.Body>
        </Modal>
      )}

      <Modal
        show={showRegisterModal}
        onHide={handelCloseRegister}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Register onClose={handelCloseRegister} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Layout;
