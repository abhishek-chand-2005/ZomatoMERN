const express = require('express');
const router = express.Router()
const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create/:orderId',
    authMiddleware.authUserMiddleware,
    paymentController.createPayment
)
router.post('/verify',
    authMiddleware.authUserMiddleware,
    paymentController.verifyPayment
)

module.exports = router