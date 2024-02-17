import React, { useState } from "react";
import { User } from "../../../rami-types";
import { getAllUsersApi, updatePasswordApi } from "../../../features/all_users_admin/allUsersAPI";
import { useAppDispatch } from "../../../app/hook";


interface ResetPasswordModalProps {
  user: User;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordModalProps> = ({ user, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState<string | null>(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<string | null>(null);
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
      setPasswordValidation(validatePassword(value)); // Validate password input
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordValidation(validateConfirmPassword(value)); // Validate confirm password input
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (password === confirmPassword) {
      return null;
    } else {
      return "הסיסמאות אינן תואמות";
    }
  };

  const handleSave = async () => {
    try {
      if (!passwordValidation && !confirmPasswordValidation) { // Check password and confirm password validations
        // Perform the password update
      await dispatch(updatePasswordApi({ user_id: user.user_id, password: password }));
        
      dispatch(getAllUsersApi());
      onClose();
        
      } else {
        console.error(passwordValidation);
        console.error(confirmPasswordValidation);
        // Handle validation errors accordingly (e.g., show error messages)
      }
    } catch (error) {
      console.error(error.message);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="mainResetPassword">
      <form>
        <h1>עדכון סיסמא</h1>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={handleInputChange}
        />
        {passwordValidation && ( // Display password validation error message
          <div className="error-message">{passwordValidation}</div>
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        {confirmPasswordValidation && ( // Display confirm password validation error message
          <div className="error-message">{confirmPasswordValidation}</div>
        )}
        <div>
          <button className="saveBtn" type="button" onClick={handleSave}>
            Save
          </button>
          <button className="cancelBtn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
