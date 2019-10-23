const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Service = require('./service')
const Order = require('./order')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
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
        unique:true,
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
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('services', {
    ref:'Service',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('orders', {
    ref:'Order',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'aaa')
    
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// Hash Plaintext before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete user service when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Service.deleteMany({owner: user._id})
})

const User = mongoose.model('User', userSchema)


module.exports = User