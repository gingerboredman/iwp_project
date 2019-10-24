const express = require('express')
const Order = require('../models/order')
const auth = require('../middleware/auth')
const router = new express.Router()
const adminAuth = require('../middleware/adminAuth')

router.post('/orders', auth, async (req,res) => {
    console.log('cals')
    const order = new Order({
        ...req.body,
        owner: req.user._id
    })

    try{
        await order.save(201)
        res.status(201).send(order)
    } catch(e){
        res.status(400).send(e)
    }  
})

router.get('/orders/:id', auth, async (req,res) => {
    const _id = req.params.id

    try{

        const order = await Order.findOne({_id, owner: req.user._id})
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch(e){
        return res.status(500).send(e)
    }
})


router.get('/orders', auth, async (req,res) => {
    console.log('jwrwe')
    try{
        await req.user.populate('orders').execPopulate()

        res.send(req.user.orders)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/ordersAdm', adminAuth, async (req,res) => {
    console.log('jwrwe')
    try{
        const orders = await Order.find({})

        res.send(orders)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/orders/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const order = await Order.findOne({_id:req.params.id, owner: req.user._id})
       

        if(!order){
            return res.status(404).send()
        }

        updates.forEach((update) => order[update] = req.body[update])
        
        await order.save()

        res.send(order)
    } catch(e){
        // console.log(e)
        res.status(400).send(e)
    }

})

router.patch('/ordersAdm/:id', adminAuth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid updates!'})
    }

    try{
        const order = await Order.findOne({_id:req.params.id})
       

        if(!order){
            return res.status(404).send()
        }

        updates.forEach((update) => order[update] = req.body[update])
        
        await order.save()

        res.send(order)
    } catch(e){
        // console.log(e)
        res.status(400).send(e)
    }

})

router.delete('/orders/:id', auth, async (req,res) => {
    try{
        const order = await Order.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!order){
            return res.status(404).send()
        }

        res.send(order)
    }catch(e){
        res.status(500).send()
    }
})


router.delete('/ordersAdm/:id', adminAuth, async (req,res) => {
    try{
        const order = await Order.findOneAndDelete({_id:req.params.id})
        if(!order){
            return res.status(404).send()
        }

        res.send(order)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router