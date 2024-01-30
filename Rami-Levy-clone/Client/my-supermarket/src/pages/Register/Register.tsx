//register tsx file

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { citiesSelector } from "../../features/cities/citiesSlice";
import { useNavigate } from "react-router-dom";
import { getAllCitiesAPI } from "../../features/cities/citiesAPI";
import "./Register.scss";

const Register = () => {
  const cities = useAppSelector(citiesSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCitiesAPI());
  }, []);

  const handelRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register");
  };
  return (
    <div className="register-main">
      <h1 className="register-title">הרשמה</h1>
      <form className="register-form" onSubmit={handelRegister}>
        <input
          type="text"
          placeholder="שם פרטי*"
          name="last_name"
          id="last_name"
        />
        <input
          type="text"
          placeholder="שם משפחה*"
          name="phone_number"
          id="phone_number"
        />
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
          name="id_number"
          id="id_number"
        />
        <input
          type="password"
          placeholder="סיסמה*"
          name="password"
          id="password"
        />
        <input
          type="password"
          placeholder="אישור סיסמה*"
          name="confirm"
          id="confirm"
        />
        <input
          type="text"
          placeholder="תעודת זהות*"
          name="id_number"
          id="id_number"
        />
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
        <button className="register-btn" type="submit">
          קחו אותי לסופר!
        </button>
      </div>
    </div>
  );
};

export default Register;
