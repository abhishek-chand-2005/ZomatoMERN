const express = require('express')
const foodPartnerController = require('../controllers/foodPartner.controller')
const userController = require('../controllers/user.controller')
const router = express.Router()

// foodPartner Routes
router.post('/register', foodPartnerController.registerFoodPartner)
router.post('/login', foodPartnerController.loginFoodPartner)
router.get('/logout', userController.logout)

module.exports = router