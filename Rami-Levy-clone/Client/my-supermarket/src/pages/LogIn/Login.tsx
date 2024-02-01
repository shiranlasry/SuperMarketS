import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
      const handleLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            
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
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
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
        </div>
    )
}

export default Login
