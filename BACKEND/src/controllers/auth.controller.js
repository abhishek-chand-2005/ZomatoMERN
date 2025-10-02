const userModel = require('../models/auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    const {fullName, email, password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const hashedsPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        password: hashedsPassword
    })

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message: 'user registered successfully',
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}


module.exports = {
    registerUser
}