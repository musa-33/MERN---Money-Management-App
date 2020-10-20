const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Route import
const userRouter = require('./routes/userRoute')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api/user', userRouter)


app.get('/', (req, res) =>{
    res.json({
        message: 'Welcome to our application'
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log(`Server is running On port ${PORT}`)
    mongoose.connect('mongodb://localhost/money-management-app', 
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    ()=>{
        console.log('Database connected')
    })
})