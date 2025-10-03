import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your user account.</p>

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

        <p className="auth-cta">Don't have an account? <Link to="/user/register">Create one</Link></p>
      </div>
    </div>
  )
}

export default UserLogin
