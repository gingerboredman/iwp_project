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