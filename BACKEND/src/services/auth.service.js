const bcrypt = require('bcryptjs')
const userDAO = require('../dao/user.dao');
const foodPartnerDAO = require('../dao/foodPartner.dao');
const findAdminByEmail = require('../dao/admin.dao')


async function registerUser(fullName, password, email) {

   try { 
        const isUserNameTaken = await userDAO.findUserByFullName(fullName);
        const isUserAlreadyExist = await userDAO.findUserByEmail(email);

        if (isUserNameTaken) {
            throw new Error('Username is already taken');
        }
        if (isUserAlreadyExist) {
            throw new Error('User with this email already exists');
        }
        
        const hashedsPassword = await bcrypt.hash(password, 10)
        const user = await userDAO.createUser({
            fullName,
            email,
            password: hashedsPassword
        })
        return {
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
        const user = await userDAO.findUserByEmail(email)
        if(!user){
            console.log("User not found with email:", email);
        }
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
    const isUserNameTaken = await foodPartnerDAO.findUserByFullName(name);
    const isAccountAlreadyExists = await foodPartnerDAO.findFoodPartnerByEmail(email);
    
    if (isUserNameTaken) {
        throw new Error('Username is already taken');
    }
    if(isUserAlreadyExist) {
        throw new Error('User with this email already exists');
    }

    try{
        if(isAccountAlreadyExists){
        throw new Error ("Food partner account already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const foodParter = await foodPartnerDAO.createFoodPartner({
        name,
        email,
        password: hashedPassword
    })

    return {
        foodParter:{
            _id: foodParter._id,
            email: foodParter.email,
            name: foodParter.name
        }
    }
    }catch(err){
        console.error("error in registerFoodPartner:", err);
        throw err;
    }
}

async function loginFoodPartner(email, password) {
    try {
        const foodPartner = await foodPartnerDAO.findFoodPartnerByEmail( email )
        if(!foodPartner){
            throw new Error("Invalid credintial.")
        }
        
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid credintial."
            })
        }
        return foodPartner;
    }catch(err){
            console.error("Error in loginFoodPartner:", err);
            throw err;
    }
}

async function loginAdmin(email, password) {
    try{
        const admin = await findAdminByEmail(email)
        if(!admin){
            throw new Error("Invalid credintial.")
        }
        return admin;
    }catch(err){
            console.error("Error in login Admin", err);
            throw err;
    }
}


module.exports = {
    registerUser,
    loginUser,
    registerFoodPartner,
    loginFoodPartner,
    loginAdmin
};


