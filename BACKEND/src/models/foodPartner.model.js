const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true,
    }
})

const foodPartnerModel = mongoose.model('foodParter', foodPartnerSchema)

module.exports = foodPartnerModel;