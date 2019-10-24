const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {
 try{
    
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(req)
    const decoded  = jwt.verify(token,'aaa')
    // console.log(decoded)
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token})
    // console.log(user)
    if(!user){
        
        throw new Error()
    }

    req.token = token
    req.user = user
    console.log('hello')
    next()

    // console.log('idahasdad')
 } catch(e) {
     res.status(401).send({error: 'Admin access required'})
 }
    
}

module.exports = auth