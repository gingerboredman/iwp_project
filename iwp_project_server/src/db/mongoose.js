const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/hostel-services-api', {
    useNewUrlParser:true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({
//     name: 'Aditya',
//     age: 'sada'
// })


// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Complaint = mongoose.model('Sevice', {
    serviceType:{
        type: String
    },
    roomNo:{
        type: Number
    },
    block:{
        type:String
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean
    }
})

const complaint = new Complaint({
    complaintType:'Cleaning',
    roomNo:802,
    block:'Q',
    description:'Ganda hai room',
    completed: false
})

complaint.save().then(() => {
    console.log(comp)
}).catch((error) => {
    console.log('Error!', error)
})