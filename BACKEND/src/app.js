const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const foodPartnerRoutes = require('./routes/foodPartner.routes')

const app = express();
app.use(cookieParser())
app.use(express.json())

app.use('/api/userAuth', userRoutes)
app.use('/api/foodPartnerAuth', foodPartnerRoutes)

module.exports = app;