import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const PartnerRegister = () => {

   const navigate = useNavigate();
  
  const handleSubmit = async (e) => { 
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
      name:businessName,
      email,
      password
    }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate("/create-food"); // Redirect to create food page after successful registration
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner sign up</h1>
        <p className="auth-sub">Register your restaurant or kitchen to receive orders.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label>Business name</label>
            <input type="text" name="businessName" placeholder="Tasty Bites" autoComplete="organization" />
          </div>

          <div className="field-row">
            <label>Contact email</label>
            <input type="email"  name="email" placeholder="business@example.com" autoComplete="email"/>
          </div>

          <div className="field-row">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create password" autoComplete="new-password" />
          </div>

          <button type="submit" className="btn-primary">Create account</button>
        </form>

        <p className="auth-cta">Already registered? <Link to="/food-partner/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default PartnerRegister
