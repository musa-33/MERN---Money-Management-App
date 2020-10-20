const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/User')
const { serverError, resourceError } = require('../util/error')
const registerValidator = require('../validator/registerValidate')
const loginValidator = require('../validator/loginValidation')

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
                    return resourceError(res, 'User Already exist')
                }

                bcrypt.hash(password, 11, (error, hash)=>{
                    if(error){
                        return serverError(res, error)
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
                        .catch(error => serverError(res, error))
                })
            })
            .catch(error => serverError(res, error))
    }
    //Check for Duplicate
    //New user object
    //Save to database
    //response back with new data
}

const login = (req, res) =>{
    const { email, password } = req.body

    const validate = loginValidator({email, password})

    if(!validate.isValid){
        return res.json(validate.error)
    }

    User.findOne({email})
        .then(user =>{
            if(!user){
                return resourceError(res, 'User not registered')
            }
            
            bcrypt.compare(password, user.password, (error, result)=>{
                if(error){
                    return serverError(res, error)
                }

                if(!result){
                    return resourceError(res, 'Password dosen\'t match')
                }

                const token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, 'SECRET', {expiresIn: '2h'})

                res.status(200).json({
                    message: 'Login Successfully',
                    token: `Bearer ${token}`
                })

            })

        })
        .catch(error => serverError(res, error))

} 

module.exports = {
    register,
    login
}