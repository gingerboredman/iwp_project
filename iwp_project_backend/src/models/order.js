const mongoose = require('mongoose')
const validator = require('validator')

const Order = mongoose.model('Order',{
    items:{
        type:Array,
        required: true
    },
    completed:{
        type:Boolean,
        required: true,
        default:false
    }
})

module.exports = Order