import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { logInUserApi } from "../../features/logged_in_user/loggedInUserAPI";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(loggedInUserSelector);
  useEffect(() => {
    if (loggedInUser) {
      console.log(loggedInUser);
      navigate("/");
    }
  }, [loggedInUser, navigate]);

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
        //setErrorMessage("Invalid email or password"); // Set error message state
      }
      console.log(resultAction.payload);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-main">
      <h1 className="login-title">כניסה</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="דואר אלקטרוני*"
          value={email}
          onChange={handleEmailChange}
          required
          title="Enter a valid email address"
        />
        <input
          type="password"
          placeholder="סיסמה*"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="login-btn">
          כניסה
        </button>
        <button type="submit" className="forgot-password">
          שכחתי סיסמה
        </button>
      </form>
      <div className="go-to-reg">
      <button className="registration" onClick={() => navigate("/register")}>
        הרשמה
      </button>
      <button className="firs-time-reg" onClick={() => navigate("/register")}>
        זאת פעם ראשונה שלי פה!
      </button>
      </div>
    </div>
  );
};

export default Login;
