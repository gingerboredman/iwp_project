const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//paths for config
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

app.get('/whome',(req,res) => {
    res.render('whome')
})

app.get('*', (req, res) => {
    res.render('404')
})


app.listen(3600, () => {
    console.log('Server up on port 3600.')
})