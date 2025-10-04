import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const handleSubmit = async (e) => {
    const navigate = useNavigate();
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    }, { withCredentials: true });

    console.log(response.data);

    navigate("/"); // Redirect to home after login

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your user account.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label>Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email"  />
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
  )
}

export default UserLogin
