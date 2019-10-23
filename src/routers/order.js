const express = require('express')
const Order = require('../models/order')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/orders', auth, async (req,res) => {
    // const service = new Service(req.body)
    console.log('adsads')
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

module.exports = router