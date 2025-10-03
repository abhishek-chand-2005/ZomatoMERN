import React from 'react'
import { Link } from 'react-router-dom'

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-sub">Register as a user to explore restaurants and order food.</p>

        <form className="auth-form" noValidate>
          <div className="field-row">
            <label>Name</label>
            <input type="text" placeholder="Your full name" />
          </div>

          <div className="field-row">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field-row">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <button type="button" className="btn-primary">Create account</button>
        </form>

        <p className="auth-cta">Already have an account? <Link to="/user/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default UserRegister
