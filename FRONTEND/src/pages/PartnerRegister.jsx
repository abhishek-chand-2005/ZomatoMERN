import React from 'react'
import { Link } from 'react-router-dom'

const PartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner sign up</h1>
        <p className="auth-sub">Register your restaurant or kitchen to receive orders.</p>

        <form className="auth-form" noValidate>
          <div className="field-row">
            <label>Business name</label>
            <input type="text" placeholder="Restaurant or kitchen name" />
          </div>

          <div className="field-row">
            <label>Contact email</label>
            <input type="email" placeholder="contact@example.com" />
          </div>

          <div className="field-row">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <button type="button" className="btn-primary">Create account</button>
        </form>

        <p className="auth-cta">Already registered? <Link to="/food-partner/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default PartnerRegister
