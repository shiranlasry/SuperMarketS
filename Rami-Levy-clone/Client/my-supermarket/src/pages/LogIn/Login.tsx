import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import { logInUserApi } from '../../features/logged_in_user/loggedInUserAPI';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector(loggedInUserSelector)
    useEffect(() => {
        if (loggedInUser) {
            console.log(loggedInUser)
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
            ;
           
            if (!resultAction.payload) {

                alert("שם משתמש או סיסמא לא נכונים");
                console.log("Invalid credentials");
                //setErrorMessage("Invalid email or password"); // Set error message state
            }
            console.log(resultAction.payload);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        title="Enter a valid email address"

                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <button type="submit" className="loginBtn">
                    קח אותי לסופר
                </button>

            </form>
            <button className="register-cancel" onClick={() => navigate("/")}>
          חזור
        </button>
        </div>
    )
}

export default Login
