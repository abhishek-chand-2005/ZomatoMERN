const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')

router.post('/createOrder/',
    authMiddleware.authUserMiddleware,
    orderController.createOrder
)

router.post('updateOrder/id',
    authMiddleware.authFoodPartnerMiddleware,
    orderController.updateOrder
)

router.get('/getOrder',
    authMiddleware.authFoodPartnerMiddleware,
    orderController.getOrderbyId
)

module.exports = router;