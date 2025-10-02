const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('mongoDB connected')
    })
    .catch((err)=>{
        console.log('MongoDB error',err)
    })
}

module.exports = connectDB