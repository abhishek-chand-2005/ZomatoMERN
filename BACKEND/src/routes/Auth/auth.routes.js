const express = require('express')
const authControllers = require('../../controllers/Auth/auth.controllers')
const router = express.Router()

// user Routes
router.post('/user/register',authControllers.registerUser)
router.post('/user/login',authControllers.loginUser)

// foodPartner Routes
router.post('/food-partner/register', authControllers.registerFoodPartner)
router.post('/food-partner/login', authControllers.loginFoodPartner)

// admin Routes
router.post('/admin/login', authControllers.loginAdmin)
// Common Routes 
router.get('/logout', authControllers.logout)

module.exports = router