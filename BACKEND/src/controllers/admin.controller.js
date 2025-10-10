const foodPartnerModel = require("../models/foodPartner.model")
const userModel = require("../models/user.model")

async function getAllUser(req, res) {
    const allUser = await userModel.find()
    console.log(allUser)
}

async function getAllFoodPartner(req, res) {
    const allFoodPartner = await foodPartnerModel.find()
    console.log(allFoodPartner)
}

async function analytics(req, res) {
    res.send('hekki')
}
module.exports = {
    getAllUser,
    getAllFoodPartner,
    analytics
}