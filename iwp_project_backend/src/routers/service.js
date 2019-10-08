const express = require('express')
const Service = require('../models/service')
const router = new express.Router()

router.post('/services', async (req,res) => {
    const service = new Service(req.body)

    try{
        await service.save(201)
        res.status(201).send(service)
    } catch(e){
        res.status(400).send(e)
    }  
})



router.get('/services', async (req,res) => {

    try{
        const services = await Service.find({})
        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/services/:id', async (req,res) => {
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

router.patch('/services/:id', async (req,res) => {
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

router.delete('/services/:id', async (req,res) => {
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

module.exports = router