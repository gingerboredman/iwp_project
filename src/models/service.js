const mongoose = require('mongoose')
const validator = require('validator')

// const serviceSchema = new mongoose.Schema()

const Service = mongoose.model('Service', {
    serviceType:{
        type: String,
        required: true
    },
    roomNo:{
        type: Number,
        required: true,
        maxlength:4,
        minlength:3

    },
    block:{
        type:String,
        required: true,
        uppercase:true,
        validate(value){
            // console.log(!(value.length === 1) || !(value.match(/[A-Za-z]/i)))
            if(!(value.length === 1) || !(value.match(/[A-Za-z]/i))){
                throw new Error('Block should be a single character')
            }
        }

    },
    description:{
        type:String,
        required: true

    },
    completed:{
        type:Number,
        required: true,
        default:0,
        validate(value){
            if(value<0 || value>3){
                throw new Error()
            }
        }

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }
})

module.exports = Service