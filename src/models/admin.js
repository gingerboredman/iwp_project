const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Service = require('./service')
const Order = require('./order')

const adminSchema = new mongoose.Schema({
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



adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens

    return adminObject
}


adminSchema.methods.generateAuthToken = async function () {
    console.log('asdasd')
    const admin = this
    console.log('dasdsad')
    const token = jwt.sign({ _id: admin._id.toString()}, 'aaa')
    
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({email})
    if(!admin){
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return admin
}

// Hash Plaintext before saving
adminSchema.pre('save', async function (next) {
    const admin = this

    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})


const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin