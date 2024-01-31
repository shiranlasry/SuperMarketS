//register tsx file

import React, { useEffect, useState } from "react";
import { useAppDispatch, } from "../../app/hook";
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
  const [confirmPasswordValidation, setconfirmPasswordValidation] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      setPasswordValidation(validatePassword(value));
    }
    if (name === "confirm_password") {
      if (newUser.password !== value) {
        setconfirmPasswordValidation("הסיסמאות אינן תואמות");
      }
      else {
        setconfirmPasswordValidation(null);}
    }
    ;
  }
  const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (newUser.password == newUser.confirm_password) {
      return null;
    }
    if (regex.test(password)) {
      return null;
    } else {
      return "הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר";
    }
  }
  // const cities = useAppSelector(citiesSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getAllCitiesAPI());
  }, []);

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newUser.password !== newUser.confirm_password) {
        setconfirmPasswordValidation("הסיסמאות אינן תואמות");
        return;
      }

      const resultAction: any = await registerAPI(newUser);
      if
        (resultAction.ok) {
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
        />
        <input
          type="text"
          placeholder="שם משפחה*"
          name="last_name"
          id="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
          name="email"
          id="email"
          value={newUser.email}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          required
          title="הכנס כתובת מייל נכונה"
        />
        <input
          type="password"
          placeholder="סיסמה*"
          name="password"
          id="password"
          value={newUser.password}
          onChange={handleInputChange}
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
        />
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
