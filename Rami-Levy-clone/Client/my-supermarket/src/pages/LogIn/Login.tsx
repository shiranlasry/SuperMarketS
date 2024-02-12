import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { logInUserApi } from "../../features/logged_in_user/loggedInUserAPI";

import "./login.scss";
interface LoginProps {
  onClose: () => void;
  RegisterPressed: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, RegisterPressed }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const loggedInUser = useAppSelector(loggedInUserSelector);

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const arg = { email, password };
      if (!arg.email || !arg.password) {
        return;
      }
      const resultAction: any = await dispatch(logInUserApi(arg));
      if (!resultAction.payload) {
        alert("שם משתמש או סיסמא לא נכונים");
        console.log("Invalid credentials");
        return;
      }
      alert("התחברת בהצלחה");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-main">
      <svg
        onClick={onClose}
        data-v-2d7301cc=""
        aria-label="סגור"
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        fill="none"
        viewBox="0 0 24 24"
        className="exit-log-svg"
        stroke="currentColor"
      >
        <path
          data-v-2d7301cc=""
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      <h1 className="login-title">
        <svg
          data-v-c9960dd8=""
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="21.84"
          height="24.52"
          viewBox="0 0 21.84 24.52"
          className="login-svg"
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
        כניסה
      </h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
          value={email}
          onChange={handleEmailChange}
          required
          title="Enter a valid email address"
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה*"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="password-toggle"
          >
            {showPassword ? (
              <svg
                data-v-91686126=""
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25.47"
                height="14.73"
                viewBox="0 0 25.47 14.73"
                class="stroke-width-1"
              >
                <defs data-v-91686126="">
                  <clipPath
                    data-v-91686126=""
                    id="a"
                    transform="translate(-1.7 -7.07)"
                  >
                    <rect
                      data-v-91686126=""
                      width="28.87"
                      height="28.87"
                      fill="none"
                    ></rect>
                  </clipPath>
                </defs>
                <path
                  data-v-91686126=""
                  d="M11.07,11.07A16.46,16.46,0,0,0,2.2,17"
                  transform="translate(-1.7 -7.07)"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  data-v-91686126=""
                  d="M11.77,11.77a3.73,3.73,0,0,0-1.12,2.67A3.77,3.77,0,0,0,17.1,17.1"
                  transform="translate(-1.7 -7.07)"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <line
                  data-v-91686126=""
                  x1="19.6"
                  y1="14.23"
                  x2="5.87"
                  y2="0.5"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></line>
                <path
                  data-v-91686126=""
                  d="M18.07,15.41a3.45,3.45,0,0,0,.15-1,3.79,3.79,0,0,0-3.79-3.79,3.45,3.45,0,0,0-1,.15"
                  transform="translate(-1.7 -7.07)"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  data-v-91686126=""
                  d="M26.67,17c-3.65-4.59-8.52-6.69-13.3-6.32"
                  transform="translate(-1.7 -7.07)"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            ) : (
              <svg
                data-v-91686126=""
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25.47"
                height="8.57"
                viewBox="0 0 25.47 8.57"
                class="stroke-width-1"
              >
                <defs data-v-91686126="">
                  <clipPath
                    data-v-91686126=""
                    id="a"
                    transform="translate(-1.7 -10.15)"
                  >
                    <rect
                      data-v-91686126=""
                      width="28.87"
                      height="28.87"
                      fill="none"
                    ></rect>
                  </clipPath>
                </defs>
                <path
                  data-v-91686126=""
                  d="M2.2,17C9,8.52,19.91,8.52,26.67,17h0"
                  transform="translate(-1.7 -10.15)"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <circle
                  data-v-91686126=""
                  cx="12.74"
                  cy="4.29"
                  r="3.79"
                  fill="none"
                  stroke="#0079f2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></circle>
              </svg>
            )}
          </button>
        </div>
        <button type="submit" className="login-btn">
          כניסה
        </button>
        <button type="submit" className="forgot-password">
          שכחתי סיסמה
        </button>
      </form>
      <div className="go-to-reg">
        <button className="registration" onClick={RegisterPressed}>
          <svg
            data-v-c9960dd8=""
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="22.58"
            height="24.52"
            viewBox="0 0 22.58 24.52"
            className="reg-svg"
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
          הרשמה
        </button>
        <button className="firs-time-reg" onClick={RegisterPressed}>
          זאת פעם ראשונה שלי פה!
        </button>
      </div>
    </div>
  );
};

export default Login;
