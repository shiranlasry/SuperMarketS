import React, { useState } from "react";
import "./UpdateUserPassword.scss";
import { User } from "../../../rami-types";
import { useAppDispatch } from "../../../app/hook";
import { updateUserPasswordApi } from "../../../features/logged_in_user/loggedInUserAPI";

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
      alert("אחד או יותר מהשדות אינם תקינים");
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
        <input
          type="password"
          placeholder="סיסמה קודמת*"
          name="oldPassword"
          className="new-password-input"
          onChange={handleInputChange}
          dir="rtl"
          style={{ textAlign: "right" }}
        />
        <input
          type="password"
          placeholder="סיסמה חדשה*"
          name="password"
          className="new-password-input"
          onChange={handleInputChange}
          dir="rtl"
          style={{ textAlign: "right" }}
        />
        {passwordValidation && <span>{passwordValidation}</span>}
        <input
          type="password"
          placeholder="אישור סיסמה*"
          name="confirmPassword"
          className="new-password-input"
          onChange={handleInputChange}
          dir="rtl"
          style={{ textAlign: "right" }}
        />
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
