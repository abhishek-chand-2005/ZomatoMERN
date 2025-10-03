const express = require('express')
const userController = require('../controllers/user.controller')
const router = express.Router()

// user Routes
router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/logout', userController.logout)

module.exports = router