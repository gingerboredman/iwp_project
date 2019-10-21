const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Service = require('./models/service')
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(serviceRouter)


app.listen(port, () => {
    console.log('Server up on port:', port)
})


const main = async () => {

    // const service = await Service.findById('5dad96d9b7b32247a7db9be4')
    // await service.populate('owner').execPopulate()
    // console.log(service.owner)
    
    const user = await User.findById('5dad94cb38ed603c65c25f7e')
    await user.populate('services').execPopulate()
    console.log(user.services)


}

main()