const foodModel = require('../models/food.model')

async function findFoodPartner(id){
    return await foodModel.find({foodPartner: id})
}

module.exports = {
    findFoodPartner
};