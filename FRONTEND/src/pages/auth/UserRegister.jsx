import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:3000/api/auth/user/register",{
      fullName: firstName,
      email: email,
      password: password

    },{
      withCredentials: true
    })

    navigate('/')
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-sub">Register as a user to explore restaurants and order food.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label htmlFor="firstName">Name</label>
            <input id="firstName" name="firstName" placeholder="Jane" autoComplete="given-name" />
          </div>

          <div className="field-row">
            <label>Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="field-row">
            <label>Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
          </div>

          <button type="submit" className="btn-primary">Create account</button>
        </form>

        <p className="auth-cta">Already have an account? <Link to="/user/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default UserRegister
