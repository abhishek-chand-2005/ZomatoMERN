import React, { useState } from 'react'; // 🛠️ You also forgot to import useState!
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [value, setValue] = useState(""); // ✅ This is fine
  const navigate = useNavigate();         // ✅ Moved to top level (legal)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    try {
      const response = await axios.post("http://localhost:3000/api/userAuth/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      navigate("/"); // ✅ Now this works

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      // You can show error message to user here
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your user account.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label>Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="field-row">
            <label>Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <p className="auth-cta">Don't have an account? <Link to="/user/register">Create one</Link></p>
      </div>
    </div>
  );
};

export default UserLogin;
