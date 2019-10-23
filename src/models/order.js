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
        type:Boolean,
        required: true,
        default:false
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }
})

module.exports = Order