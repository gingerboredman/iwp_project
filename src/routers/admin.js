const express = require('express')
const User = require('../models/user')
const Admin = require('../models/admin')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

router.post('/admin/login', async (req, res) => {
    try{

        var email = req.body.email
        
        const user = await Admin.findByCredentials(req.body.email,req.body.password)
        console.log('idharbho')
        const token = await user.generateAuthToken()
        console.log('idhar')
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/admin/register', async (req,res) => {
    await Admin.init()
    const user = new Admin(req.body)
    console.log(user)
    try {
        await user.save()
        const token = await user.generateAuthToken()  
        res.status(201).send({user, token})
    } catch(e){
        res.status(400).send(e)
    }

})

router.post('/admin/logout', adminAuth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router