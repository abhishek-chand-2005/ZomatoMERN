const express = require('express')
const foodPartnerController = require('../controllers/foodPartner.controller')
const router = express.Router()

// foodPartner Routes
router.post('/register', foodPartnerController.registerFoodPartner)
router.post('/login', foodPartnerController.loginFoodPartner)

module.exports = router