const path = require('path')
const { createClient } = require('redis');
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast');
const redis = require('./utils/redis/redis');
const port = process.env.PORT || 3000

// Paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: '',
        name: 'Matan Cohen'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: '',
        name: 'Matan Cohen'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: '',
        name: 'Matan Cohen'
    })
})

app.get('/weather',(req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: "You must provide a location"
        })
    }

    forecast.getWeatherByCity(req.query.address,(error,data) =>{
        if(error)
            res.send({
                error: error
            })
        else{
            res.send({
                weatherDetails: data
            })
        }
            
    })


})

app.get('/updateNumRequest',async (req,res) => {
    redis.setRequestNum((error,numRequest)=>{
        if(error){
            res.send({
                error: error
            })
        }
        else{
            res.send({
                numRequest: numRequest
            })
        }
    })


})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Matan Cohen'

    })
})

app.get('/about/*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'About article not found',
        name: 'Matan Cohen'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Matan Cohen'
    })
})

app.listen(port,() => {
    console.log("server is up on port " + port);
})