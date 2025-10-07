const foodPartnerModel = require("../../models/foodPartner.model");
const AuthService = require('../../services/auth.service')
const { validateRegisterInput, validateLoginInput } = require('../../validator/auth.validate');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const {fullName, email, password} = req.body;

    const validationError = validateRegisterInput(fullName, password, email);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const user = await AuthService.registerUser(fullName, password, email);

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

async function loginUser(req, res) {
    const { email, password} = req.body;

    const validateLoginInputError = validateLoginInput(email, password);
    if (validateLoginInputError) {
        return res.status(400).json({ message: validateLoginInputError });
    }

    const user = await AuthService.loginUser(email, password)
    console.log('hi')
    console.log(user)
    if(!user){
        return res.status(400).json({
            message: "Invalid credintial."
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"User loggedIn successfully.",

        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function registerFoodPartner(req, res) {
    const {name, email, password} = req.body;

    const validateionError = validateRegisterInput(name, password, email);
    if(validateionError){
        return res.status(400).json({
            message: validateionError
        })
    }

    const foodParter = await AuthService.registerFoodPartner(name, password, email);

    const token = jwt.sign({
        id: foodParter._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message:"Food partner registered successfully",
        foodParter: {
            _id: foodParter._id,
            email: foodParter.email,
            name: foodParter.naem
        }
    })
}

async function loginFoodPartner(req, res) {
    const { email, password} = req.body;
    const user = await foodPartnerModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message: "Invalid credintial."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid credintial."
    })}

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"User loggedIn successfully.",

        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function logout(req, res) {
    res.clearCookie('token')
    res.status(200).json({
        message: "User loggid out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    registerFoodPartner,
    loginFoodPartner,
    logout
}