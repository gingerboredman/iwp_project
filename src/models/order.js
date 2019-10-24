const mongoose = require('mongoose')
const validator = require('validator')

const Order = mongoose.model('Order',{
    item:{
        type:String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    completed:{
        type: Number,
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

module.exports = Order