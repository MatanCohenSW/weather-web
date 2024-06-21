const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast');
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
        title: 'Weather',
        name: 'Matan Cohen'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Matan Cohen'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        helpText: 'Here to write help',
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
                address: data
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