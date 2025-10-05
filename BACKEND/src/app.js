const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const foodPartnerRoutes = require('./routes/foodPartner.routes')
const foodRoutes = require('./routes/food.route')
const foodPartner = require('./routes/food-partner.route')
const cors = require('cors')

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/userAuth', userRoutes)
app.use('/api/foodPartnerAuth', foodPartnerRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/food-partner', foodPartner)

module.exports = app;