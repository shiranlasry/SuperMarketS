import React, { useState } from 'react'
import './UpdateUserPassword.scss'
import { User } from '../../../rami-types';
import { useAppDispatch } from '../../../app/hook';
import { updateUserPasswordApi } from '../../../features/logged_in_user/loggedInUserAPI';


type UserProps = {
    user: User;
    onClose: () => void;
  };
const UpdateUserPassword: React.FC<UserProps> = ({ user, onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
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
        }
        else if (name === "oldPassword") {
            setOldPassword(value);
          }
      };

      const handleUpdatePassword = () => {
        debugger;
        if (passwordValidation || confirmPasswordValidation || !oldPassword || !password || !confirmPassword ||!user.user_id) {
            alert("אחד או יותר מהשדות אינם תקינים");
          return;
        }
       dispatch(updateUserPasswordApi({ user_id: user.user_id, old_password: oldPassword, new_password: password }));
        onClose();

      }
  return (
    <div className='update-user-password-container'>
        <h1>עדכון סיסמא</h1>
        <div className='update-user-password-form'>
        <input type="password" placeholder="סיסמא ישנה" name="oldPassword" onChange={handleInputChange} />
        <input type="password" placeholder="סיסמא חדשה" name="password" onChange={handleInputChange} />
        {passwordValidation && <span>{passwordValidation}</span>}
        <input type="password" placeholder="אימות סיסמא" name="confirmPassword" onChange={handleInputChange} />
        {confirmPasswordValidation && <span>{confirmPasswordValidation}</span>}
        <button onClick={handleUpdatePassword}>שמירה</button>
        <button onClick={onClose}>ביטול</button>
        </div>
      
    </div>
  )
}

export default UpdateUserPassword
