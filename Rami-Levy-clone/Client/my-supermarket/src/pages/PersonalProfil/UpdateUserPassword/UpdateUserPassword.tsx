import React, { useState } from "react";
import "./UpdateUserPassword.scss";
import { User } from "../../../rami-types";
import { useAppDispatch } from "../../../app/hook";
import { updateUserPasswordApi } from "../../../features/logged_in_user/loggedInUserAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserProps = {
  user: User;
  onClose: () => void;
};
const UpdateUserPassword: React.FC<UserProps> = ({ user, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState<string | null>(
    null
  );
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<
    string | null
  >(null);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Add state for showing password

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState); // Toggle the state
  };

  const dispatch = useAppDispatch();
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    if (user.password === user.confirm_password) {
      return null;
    }
    if (regex.test(password)) {
      return null;
    } else {
      return "הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד";
    }
  };
  const validateConfirmPassword = (confirmPassword: string) => {
    if (password === confirmPassword) {
      return null;
    } else {
      return "הסיסמאות אינן תואמות";
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
      setPasswordValidation(validatePassword(value)); // Validate password input
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordValidation(validateConfirmPassword(value)); // Validate confirm password input
    } else if (name === "oldPassword") {
      setOldPassword(value);
    }
  };

  const handleUpdatePassword = () => {
    if (
      passwordValidation ||
      confirmPasswordValidation ||
      !oldPassword ||
      !password ||
      !confirmPassword ||
      !user.user_id
    ) {
      toast.error("אחד או יותר מהשדות אינם תקינים");
      return;
    }
    dispatch(
      updateUserPasswordApi({
        user_id: user.user_id,
        old_password: oldPassword,
        new_password: password,
      })
    );
    onClose();
  };
  return (
    <div className="update-user-password-container">
      <div className="modal-header">
        <h3 className="new-password-title">
          <svg
            data-v-19c2d99e=""
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="30.01"
            viewBox="0 0 21 30.01"
            className="lock-svg"
          >
            <rect
              data-v-19c2d99e=""
              x="0.5"
              y="9.51"
              width="20"
              height="20"
              rx="3.05"
              fill="none"
              stroke="#0079f2"
              stroke-miterlimit="10"
            ></rect>
            <path
              data-v-19c2d99e=""
              d="M16.27,9.17V6.27A5.77,5.77,0,0,0,10.5.5h0A5.77,5.77,0,0,0,4.73,6.27h0v2.9"
              fill="none"
              stroke="#0079f2"
              stroke-miterlimit="10"
            ></path>
            <path
              data-v-19c2d99e=""
              d="M13.47,17.12a3,3,0,1,0-4,2.77v3.92a1,1,0,0,0,1.05,1.05h0a1,1,0,0,0,1.05-1.05h0V19.89A3,3,0,0,0,13.47,17.12Z"
              fill="none"
              stroke="#0079f2"
              stroke-miterlimit="10"
            ></path>
          </svg>{" "}
          סיסמה חדשה
        </h3>
        <button
          type="button"
          className="new-password-closeBtn"
          onClick={onClose}
        >
          <svg
            onClick={onClose}
            data-v-2d7301cc=""
            aria-label="סגור"
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            fill="none"
            viewBox="0 0 24 24"
            className="exit-pass-svg"
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
        </button>
      </div>

      <div className="update-user-password-form">
        <div className="newPass-old-wrappere">
          <button
            className="show-old-password-btn"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
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
            ) : (
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
            )}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה קודמת*"
            name="oldPassword"
            className="new-password-input"
            onChange={handleInputChange}
            dir="rtl"
            style={{ textAlign: "right" }}
          />
        </div>

        <div className="newPass-new-wrapper">
          <button
            className="show-new-passwordBtn"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
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
            ) : (
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
            )}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה חדשה*"
            name="password"
            className="new-password-input"
            onChange={handleInputChange}
            dir="rtl"
            style={{ textAlign: "right" }}
          />
        </div>
        {passwordValidation && <span>{passwordValidation}</span>}
        <div className="newPass-confirm-wrapper">
          <button
            className="show-confirm-passwordBtn"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
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
            ) : (
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
            )}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="אישור סיסמה*"
            name="confirmPassword"
            className="new-password-input"
            onChange={handleInputChange}
            dir="rtl"
            style={{ textAlign: "right" }}
          />
        </div>
        <div className="new-password-btns">
          {confirmPasswordValidation && (
            <span>{confirmPasswordValidation}</span>
          )}
          <button className="new-pass-cancel" onClick={onClose}>
            ביטול
          </button>
          <button className="new-pass-save" onClick={handleUpdatePassword}>
            שמירה
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPassword;
