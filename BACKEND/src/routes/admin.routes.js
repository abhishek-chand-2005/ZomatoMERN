const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const adminController = require('../controllers/admin.controller')
const router = express.Router()


router.post('/user',
    authMiddleware.authAdminMiddleware,
    adminController.getAllUser
)

router.post('/foodPartner',
    authMiddleware.authAdminMiddleware,
    adminController.getAllFoodPartner
)

router.post('/analytics',
    authMiddleware.authAdminMiddleware,
    adminController.analytics
)

module.exports = router