const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    regNo:{
        type: String,
        required: true,
        trim:true,
        uppercase: true,
        validate(value) {
            var pattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/
            if(!value.match(pattern))
            {
                throw new Error('Invalid Reg No.')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength:8
    }
})


module.exports = User