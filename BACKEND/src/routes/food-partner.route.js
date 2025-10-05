const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const foodController = require('../controllers/food-partner.controller')
const multer = require('multer')

router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItemsByFoodPartnerId
)

module.exports = router