const express = require('express')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

const router = new express.Router()

router.post('/services', auth, async (req,res) => {
    // const service = new Service(req.body)
    console.log(req.body)
    const service = new Service({
        ...req.body,
        owner: req.user._id
    })

    try{
        await service.save(201)
        console.log("sending" + service)
        res.status(201).send(service)
    } catch(e){
        res.status(400).send(e)
    }  
})



router.get('/services', auth, async (req,res) => {

    try{
        // const services = await Service.find({owner: req.user._id})
        await req.user.populate('services').execPopulate()

        res.send(req.user.services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/servicesAdm', adminAuth, async (req,res) => {

    try{
        const services = await Service.find({})
        console.log(services)

        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/services/:id', auth, async (req,res) => {
    const _id = req.params.id

    try{
        //const service = await Service.findById(_id)

        const service = await Service.findOne({_id, owner: req.user._id})
        if(!service) {
            return res.status(404).send()
        }
        res.send(service)
    } catch(e){
        return res.status(500).send(e)
    }
})

router.patch('/services/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const service = await Service.findOne({_id:req.params.id, owner: req.user._id})
        // // console.log(req.params.id)
        // const service = await Service.findById(req.params.id)

        
        // // const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})

        if(!service){
            return res.status(404).send()
        }

        updates.forEach((update) => service[update] = req.body[update])
        
        await service.save()

        res.send(service)
    } catch(e){
        // console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/services/:id', auth, async (req,res) => {
    try{
        const service = await Service.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!service){
            return res.status(404).send()
        }

        res.send(service)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router