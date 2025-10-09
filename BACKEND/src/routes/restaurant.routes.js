const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const foodController = require('../controllers/food.controller')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

//[protected]
router.post('/createFood',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood 
)

router.delete('/:id',
    authMiddleware.authFoodPartnerMiddleware,
    foodController.deleteFood

)

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

router.get('/:id/analytics',
  authMiddleware.authFoodPartnerMiddleware,
  foodController.foodAnalytics
)

// router.ger('/food/:id/analytics',  async (req, res) => {
//   const { id } = req.params;

//   try {
//     const analytics = await RestaurantAnalytics.findOne({ restaurantId: id });

//     if (!analytics) {
//       return res.status(404).json({ message: 'Analytics not found for this restaurant.' });
//     }

//     return res.json(analytics);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error fetching analytics.' });
//   }
// });


module.exports = router