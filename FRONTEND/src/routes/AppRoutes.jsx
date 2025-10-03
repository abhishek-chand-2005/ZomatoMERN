import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Home from '../pages/Home'

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/register" element={<UserRegister/>} />
      <Route path="/user/login" element={<UserLogin/>} />
      <Route path="/food-partner/register" element={<PartnerRegister/>} />
      <Route path="/food-partner/login" element={<PartnerLogin/>} />
    </Routes>
    </Router>
  )
}

export default AppRoutes