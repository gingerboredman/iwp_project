const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/user/chatbot', auth,  async (req,res) => {
    const AssistantV2 = require('ibm-watson/assistant/v2');
            const { IamAuthenticator } = require('ibm-watson/auth');

            const service = new AssistantV2({
            version: '2019-02-28',
            authenticator: new IamAuthenticator({
                apikey: '1VqbLRcChDmmzx6qyfOmpecfYSy5Ho2k6gfNflrhR0Rh',
            }),
            url: 'https://gateway-lon.watsonplatform.net/assistant/api',
            });

    const q = req.body.q;
    var op ;

    service.createSession({
        assistantId: '2988d392-847b-4da4-bf48-e8da31ea669d'
      })
        .then(resp => {
          var id = resp['result']['session_id'];
          
          service.message({
            assistantId: '2988d392-847b-4da4-bf48-e8da31ea669d',
            sessionId: id,
            input: {
              'message_type': 'text',
              'text': q
              }
            })
            .then(resp => {
                // console.log(JSON.stringify(resp))
                if(resp['result']['output']['intents'].length >0){
              return res.status(200).send(resp['result']['output']['intents'][0]);}
              else{
                return res.status(200).send({"result": {"output":{'intents':['not_def']}}});
              }
            })
            .catch(err => {
              console.log(err);resolve
            });
    




          
        })
        .catch(err => {
          console.log(err);
        });
    }
    )
  
    
  

router.post('/users/register', async (req,res) => {
    await User.init()
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        console.log('sada')
        const token = await user.generateAuthToken()  
        res.status(201).send({user, token})
    } catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try{

        var email = req.body.email
        console.log('herer')

        const user = await User.findByCredentials(req.body.email,req.body.password)
        console.log('herer')

        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})



router.post('/users/logout', auth, async (req,res) => {
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

router.post('/users/logoutAll', auth, async (req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})


//repurpose for admin
router.get('/users', auth, async (req,res) => {

    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})

router.get('/users/:id',async (req,res) => {
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


router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        // console.log(req.params.id)
        
        // console.log(user)

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        // if(!user){
        //     return res.status(404).send()
        // }
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

//admin
router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        // console.log(req.params.id)
        const user = await User.findById(req.params.id)
        
        // console.log(user)

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        res.send(user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})




router.delete('/users/me', auth, async (req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()

        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// change to auth admin
router.delete('/users/:id', auth, async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(520).send()
    }
})

module.exports = router