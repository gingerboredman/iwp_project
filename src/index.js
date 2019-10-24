const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Service = require('./models/service')
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')
const orderRouter = require('./routers/order')
const adminRouter = require('./routers/admin')
const hbs = require('hbs')
const path = require('path')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(serviceRouter)
app.use(orderRouter)
app.use(adminRouter)


const publidDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up hb engine and location for views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup statics directory
app.use(express.static(publidDirectoryPath))

app.get('',(req,res) => {
    res.render('index')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

app.get('/signin',(req,res) => {
    res.render('signin')
})

app.get('/home',(req,res) => {
    res.render('home')
})

app.get('/complaints',(req,res) => {
    res.render('complaints')
})

app.get('/ordersPage',(req,res) => {
    res.render('ordersPage')
})

app.get('/adminLogin', (req, res) => {
    res.render('adminLogin')
})

app.get('/adminHome', (req, res) => {
    res.render('adminHome')
})

app.get('/adminOrders', (req, res) => {
    res.render('adminOrders')
})

app.get('/adminComplaints', (req, res) => {
    res.render('adminComplaints')
})

app.get('*', (req, res) => {
    res.render('404')
})


app.listen(port, () => {
    console.log('Server up on port:', port)
})


