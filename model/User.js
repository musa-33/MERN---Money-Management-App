const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: Number,
    income: Number,
    expense: Number,
    transaction: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User