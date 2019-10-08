const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Service = require('./models/service')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req,res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/services', (req,res) => {
    const service = new Service(req.body)

    service.save().then(() => {
        res.send(service)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server up on port:', port)
})