const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const foodController = require('../controllers/food.controller')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

//[protected]
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood )

router.get('/', 
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)

router.post('/like', 
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFoodItem
)

router.get('/saved',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoodItems
)


module.exports = router