// register.tsx file

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { User } from "../../rami-types";
import registerAPI from "../../features/usersAPI";

const Register = () => {
  const initialUserState: User = {
    user_id: null,
    email: '',
    id_number: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    role_id: 2,
    addresses: []
  };

  const [newUser, setNewUser] = useState<User>(initialUserState);
  const [passwordValidation, setPasswordValidation] = useState<string | null>(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<string | null>(null);
  const [IDValidation, setIDValidation] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      setPasswordValidation(validatePassword(value));
    }
    if (name === "confirm_password") {
      setConfirmPasswordValidation(validateConfirmPassword(value));
    }
    if (name === "id_number") {
      setIDValidation(validateIsraeliID(value));
    }
    if (name === "email") {
      setEmailValidation(validateEmail(value));
    }
  };

  const validateIsraeliID = (idNumber: string) => {
    if (/^\d{9}$/.test(idNumber)) {
      return null;
    } else {
      return "מספר תעודת הזהות הישראלית אינו תקין";
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (newUser.password === newUser.confirm_password) {
      return null;
    }
    if (regex.test(password)) {
      return null;
    } else {
      return "הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר";
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (newUser.password === confirmPassword) {
      return null;
    } else {
      return "הסיסמאות אינן תואמות";
    }
  };

  const validateEmail = (email: string) => {
    // Add your email validation logic here
    // For example, you can use a regex or other validation rules
    // Return null if email is valid, otherwise return an error message
    // Sample regex for basic email validation:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "כתובת הדואר האלקטרוני אינה תקינה";
  };

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // validate password
      if (passwordValidation || confirmPasswordValidation) {
        alert("הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר");
        return;
      }

      // validate ID
      if (IDValidation) {
        alert("מספר תעודת הזהות הישראלית אינו תקין");
        return;
      }

      // validate email
      if (emailValidation) {
        alert("כתובת הדואר האלקטרוני אינה תקינה");
        return;
      }

      // if all fields are valid
      const resultAction: any = await registerAPI(newUser);
      if (resultAction.ok) {
        alert("ההרשמה בוצעה בהצלחה");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-main">
      <h1 className="register-title">הרשמה</h1>
      <form className="register-form" onSubmit={handelRegister}>
        <input
          type="text"
          placeholder="שם פרטי*"
          name="first_name"
          id="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="שם משפחה*"
          name="last_name"
          id="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
          name="email"
          id="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
          title="הכנס כתובת מייל נכונה"
        />
        {emailValidation && (
          <div className="error-message">{emailValidation}</div>
        )}
        <input
          type="password"
          placeholder="סיסמה*"
          name="password"
          id="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        {passwordValidation && (
          <div className="error-message">{passwordValidation}</div>
        )}
        <input
          type="password"
          placeholder="אישור סיסמה*"
          name="confirm_password"
          id="confirm_password"
          value={newUser.confirm_password}
          onChange={handleInputChange}
        />
        {confirmPasswordValidation && (
          <div className="error-message">{confirmPasswordValidation}</div>
        )}
        <input
          type="text"
          placeholder="תעודת זהות*"
          name="id_number"
          id="id_number"
          value={newUser.id_number}
          onChange={handleInputChange}
          required
        />
        {IDValidation && (
          <div className="error-message">{IDValidation}</div>
        )}
        <button className="register-btn" type="submit">
          קחו אותי לסופר!
        </button>
      </form>
      <div className="reg-disclaimers">
        <p>
          הנני מאשר/ת את תקנון אתר רמי לוי באינטרנט המחודש ואת הצטרפותי ללא עלות
          למועדון לקוחות רמי לוי בכפוף לתקנון המועדון *
        </p>
        <p>
          הנני מאשר/ת לקבל הטבות, מבצעים, עדכונים והצעות למוצרים ושירותים מקבוצת
          רמי לוי באמצעי התקשורת שמסרתי לקבוצה. ידוע לי כי אוכל לחזור בי מהסכמתי
          בכל עת.
        </p>
      </div>
      <div>
        <button className="register-cancel" onClick={() => navigate("/")}>
          ביטול
        </button>
      </div>
    </div>
  );
};

export default Register;
