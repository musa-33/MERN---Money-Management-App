const express = require('express')
const router = express.Router()

const { register } = require('../controllers/userController')

//Registration Route
router.post('/register', register)


//Login Route
router.post('/login', (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    res.json({
        message: `Welcome ${name}, We will contact with you by email`
    })
})


module.exports = router