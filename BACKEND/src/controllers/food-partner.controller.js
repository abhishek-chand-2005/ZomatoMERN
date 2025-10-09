const foodPartnerDAO = require('../dao/foodPartner.dao')
const foodDAO = require('../dao/food.dao')

async function getFoodItemsByFoodPartnerId(req, res) {
    
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerDAO.findFoodPartnerById(foodPartnerId);
    const foodItemsByFoodPartner = await foodDAO.findFoodPartner(foodPartnerId)

    if(!foodPartner){
        return res.status(404).json({ message: "Food partner not found"})
    }
    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })

}

module.exports = {
    getFoodItemsByFoodPartnerId
}