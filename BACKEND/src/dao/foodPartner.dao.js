const foodPartnerModel = require('../models/foodPartner.model');

async function findUserByFullName(name) {
    return await foodPartnerModel.findOne({ name });
}

async function findFoodPartnerByEmail(email) {
    return await foodPartnerModel.findOne({ email });
}

async function findFoodPartnerById(id) {
    return await foodPartnerModel.findById(id);
}

async function createFoodPartner(data) {
    return await foodPartnerModel.create(data);
}

module.exports = {
    findUserByFullName,
    findFoodPartnerByEmail,
    createFoodPartner,
    findFoodPartnerById
};