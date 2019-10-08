const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Service = require('./models/service')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Endpoints for users

app.post('/users', async (req,res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }

})

app.get('/users',async (req,res) => {

    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
})

app.get('/users/:id',async (req,res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        return res.status(500).send()
    }
})

app.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

//Endpoints for services

app.post('/services', async (req,res) => {
    const service = new Service(req.body)

    try{
        await service.save(201)
        res.status(201).send(service)
    } catch(e){
        res.status(400).send(e)
    }  
})



app.get('/services', async (req,res) => {

    try{
        const services = await Service.find({})
        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

app.get('/services/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const service = await Service.findById(_id)
        if(!service) {
            return res.status(404).send()
        }
        res.send(service)
    } catch(e){
        return res.status(500).send(e)
    }
})

app.patch('/services/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})

        if(!service){
            return res.status(404).send()
        }
        res.send(service)
    } catch(e){
        res.status(400).send(e)
    }
})

app.delete('/services/:id', async (req,res) => {
    try{
        const service = await Service.findByIdAndDelete(req.params.id)

        if(!service){
            return res.status(404).send()
        }

        res.send(service)
    }catch(e){
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server up on port:', port)
})