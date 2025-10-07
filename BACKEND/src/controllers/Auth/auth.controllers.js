const AuthService = require('../../services/auth.service')
const { validateRegisterInput, validateLoginInput } = require('../../validator/auth.validate');
const { signToken } = require('../../utils/jwt')

async function registerUser(req, res) {
    const {fullName, email, password} = req.body;

    const validationError = validateRegisterInput(fullName, password, email);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const newUser = await AuthService.registerUser(fullName, password, email);

    const token = signToken({id: newUser._id})

    res.cookie("token", token)
    res.status(201).json({message: 'user registered successfully'})
}

async function loginUser(req, res) {
    const { email, password} = req.body;

    const validateLoginInputError = validateLoginInput(email, password);
    if (validateLoginInputError) {
        return res.status(400).json({ message: validateLoginInputError });
    }

    const newUser = await AuthService.loginUser(email, password)

    if(!newUser){
        return res.status(400).json({
            message: "Invalid credintial."
        })
    }

    const token = signToken({id: newUser._id})

    res.cookie("token", token)

    res.status(200).json({
        message:"User loggedIn successfully.",

        user:{
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName
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

     const token = signToken({id: foodParter._id})

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

    const validateLoginInputError = validateLoginInput(email, password);
    if (validateLoginInputError) {
        return res.status(400).json({ message: validateLoginInputError });
    }

    const foodPartner = await AuthService.loginFoodPartner(email, password)

    const token = signToken({id: foodPartner._id})

    res.cookie("token", token)

    res.status(200).json({
        message:"User loggedIn successfully.",

        user:{
            _id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.fullName
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