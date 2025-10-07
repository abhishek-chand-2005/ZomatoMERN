const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const foodPartnerModel = require("../models/foodPartner.model");


async function registerUser(fullName, password, email) {

   try { 
        const isUserNameTaken = await userModel.findOne({ fullName });
        const isUserAlreadyExist = await userModel.findOne({email})

        if (isUserNameTaken) {
            throw new Error('Username is already taken');
        }
        if (isUserAlreadyExist) {
            throw new Error('User with this email already exists');
        }
        
        const hashedsPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            fullName,
            email,
            password: hashedsPassword
        })
        return {
            message: 'user created in DB successfully',
            user:{
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        }
    }catch (error) {
        console.error("Error in registerUser:", error);
        throw error;  // Propagate error for further handling if needed
    }
}

async function loginUser(email, password) {
    try {
        const user = await userModel.findOne({email})
        if(!user){
            console.log("User not found with email:", email);
        }
        console.log(user)
         const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid){
                return res.status(400).json({
                    message: "Invalid credintial."
            })}
        return user;
    }catch(err){
        console.error("Error in login:", err);
        throw err;
    }
}

async function registerFoodPartner(name, password, email) {
    const isAccountAlreadyExists = await foodPartnerModel.findOne({email})
    
        try{
            if(isAccountAlreadyExists){
            throw new Error ("Food partner account already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const foodParter = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword
        })

        return foodParter;
    }catch(err){
        console.error("error in registerFoodPartner:", err);
        throw err;
    }
}


module.exports = {
    registerUser,
    loginUser,
    registerFoodPartner
};


