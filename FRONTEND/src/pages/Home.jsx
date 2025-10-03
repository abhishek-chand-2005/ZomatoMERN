import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-copy">
          <h1 style={{margin:'0 0 8px 0'}}>Welcome to Zomato-style app</h1>
          <p style={{margin:0, color:'rgb(var(--muted))'}}>Choose how you'd like to continue — as a normal user or as a food partner.</p>
        </div>

        <div className="home-actions">
          <Link to="/user/register"><button className="btn-primary">Register as user</button></Link>
          <Link to="/food-partner/register"><button className="btn-outline">Register as food partner</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home
