const userModel = require('../models/user.model');

async function findUserByEmail(email) {
    return await userModel.findOne({ email });
}

async function findUserByFullName(fullName) {
    return await userModel.findOne({ fullName });
}

async function createUser(data) {
    return await userModel.create(data);
}

module.exports = {
    findUserByEmail,
    findUserByFullName,
    createUser
};