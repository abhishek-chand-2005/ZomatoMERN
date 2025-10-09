const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Routes imports
const userRoutes = require('./routes/Auth/auth.routes')
const restaurantRoutes = require('./routes/restaurant.routes')
const foodPartner = require('./routes/food-partner.route')
const orderRoutes = require('./routes/order.routes.js')

// Database
const connectDB = require('./config/db')

// Initializations
connectDB()
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// SET UP - Routes middlewares
app.use('/api/Auth', userRoutes)
app.use('/api/food-partner', foodPartner)
app.use('/api/food', restaurantRoutes)
app.use('/api/order', orderRoutes)

module.exports = app;