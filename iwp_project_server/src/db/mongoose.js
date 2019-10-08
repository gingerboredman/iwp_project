const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/hostel-services-api', {
    useNewUrlParser:true,
    useCreateIndex: true
})







// const service = new Sevice({
//     serviceType:'Cleaning',
//     roomNo:802,
//     block:'q',
//     description:'Ganda hai room',
//     completed: false
// })

// service.save().then(() => {
//     console.log(service)
// }).catch((error) => {
//     console.log('Error!', error)
// })