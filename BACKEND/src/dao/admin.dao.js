const adminModel = require('../models/admin.model')

async function findAdminByEmail(email) {
    return await adminModel.findOne({ email });
}

module.exports = findAdminByEmail