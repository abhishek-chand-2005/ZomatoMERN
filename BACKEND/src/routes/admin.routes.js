const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()


router.post('/user', (req, res) =>{
    res.send('login route working')
}
)

module.exports = router