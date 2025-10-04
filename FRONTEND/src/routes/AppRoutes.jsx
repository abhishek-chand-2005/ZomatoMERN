import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import PartnerRegister from '../pages/auth/PartnerRegister'
import PartnerLogin from '../pages/auth/PartnerLogin'
import CreateFood from '../pages/food-partner/CreateFood'
import Home from '../pages/general/Home'

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/register" element={<UserRegister/>} />
      <Route path="/user/login" element={<UserLogin/>} />
      <Route path="/food-partner/register" element={<PartnerRegister/>} />
      <Route path="/food-partner/login" element={<PartnerLogin/>} />
      <Route path="/create-food" element={<CreateFood/>} />
    </Routes>
    </Router>
  )
}

export default AppRoutes