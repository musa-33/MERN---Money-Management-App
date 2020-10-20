const registerValidator = require('../validator/registerValidate')
const User = require('../model/User')
const { use } = require('passport')
const bcrypt = require('bcrypt')

const register = (req, res)=>{
    
    //Read User Data
    const {name, email, password, confirmPassword} = req.body

    //Validate user data
    const validate = registerValidator({name, email, password, confirmPassword})
    if(!validate.isValid){
        res.status(400).json(validate.error)
    }else{
        User.findOne({email})
            .then(user =>{
                if(user){
                    return res.status(400).json({
                        message: 'User Already exist'
                    })
                }

                bcrypt.hash(password, 11, (error, hash)=>{
                    if(error){
                        return res.status(500).json({
                            message: 'Server Error Occured',
                            error
                        })
                    }

                    const user = new User({
                        name, 
                        email,
                        password: hash
                    })

                    user.save()
                        .then(user =>{
                            res.status(201).json({
                                message: 'User created '
                            })
                        })
                        .catch(error =>{
                            res.status(400).json({
                                message: 'Server Error Occured',
                                error
                            })
                        })
                })
            })
            .catch(error =>{
                res.status(400).json({
                    message: 'Server Error Occured',
                    error
                })
            })
    }
    //Check for Duplicate
    //New user object
    //Save to database
    //response back with new data
}

module.exports = {
    register
}