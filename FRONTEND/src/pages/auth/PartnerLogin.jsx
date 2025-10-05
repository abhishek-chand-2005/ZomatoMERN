import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PartnerLogin = () => {

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/foodPartnerAuth/login", {
      email,
      password
    }, { withCredentials: true });

    console.log(response.data);

    navigate("/create-food"); // Redirect to create food page after login

  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Access your partner dashboard.</p>

        <form className="auth-form" onSubmit={handleSubmit}  noValidate>
          <div className="field-row">
            <label>Email</label>
            <input type="email" name="email" placeholder="business@example.com" autoComplete="email"/>
          </div>

          <div className="field-row">
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <p className="auth-cta">Need an account? <Link to="/food-partner/register">Register</Link></p>
      </div>
    </div>
  )
}

export default PartnerLogin
