const adminModel = require('../models/admin.model');
const foodParterModel = require('../models/foodPartner.model')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token){
       return res.status(401).json({
            message:"Please Login First"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodParterModel.findById(decoded.id)
        
        req.foodPartner = foodPartner

        if(!foodPartner){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        next();


    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user =  await userModel.findById(decoded.id)
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function authAdminMiddleware(req, res, next) {
     const token = req.cookies.token;

    if(!token){
       return res.status(401).json({
            message:"Please Login First"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded.id)
        
        req.admin = admin

        if(!admin){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        next();


    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    authAdminMiddleware
}