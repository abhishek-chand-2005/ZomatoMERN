import React from 'react'
import { Link } from 'react-router-dom'

const PartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Access your partner dashboard.</p>

        <form className="auth-form" noValidate>
          <div className="field-row">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field-row">
            <label>Password</label>
            <input type="password" placeholder="Your password" />
          </div>

          <button type="button" className="btn-primary">Sign in</button>
        </form>

        <p className="auth-cta">Need an account? <Link to="/food-partner/register">Register</Link></p>
      </div>
    </div>
  )
}

export default PartnerLogin
