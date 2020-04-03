const path = require('path');                                       //Import path module
const express = require('express')                                  //Import express module
const hbs = require('hbs')                                          //Import hbs module
const geocode = require('./utils/geocode')                          //Import geocode module
const forecast = require('./utils/forecast')                        //Import forecast module

const app = express()                                               //Creates an Express application. 

app.set('view engine', 'hbs')                                       //Setup hbs(Handlebars) engine

const partialsPath = path.join(__dirname, '../templates/partials')  //Set the partials path
hbs.registerPartials(partialsPath)

const viewsPath = path.join(__dirname, '../templates/views')        //Set different views dir than the default
app.set('views', viewsPath)

app.use(express.static(path.join(__dirname, '../public')))          //Setup 'public' as default static dir to serve

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arie Charfnadel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arie Charfnadel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text...',
        title: 'Help page',
        name: 'Arie Charfnadel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error: 'You should Search for some address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error})
            }
    
            res.send({
                location,
                forecastData
          })
        })    
    })
})

app.get('/help/*', (req, res) => {                                  //Help - 404 Page
    res.render('404', {
        title: '404',
        name: 'Arie Charfnadel',
        notFoundText: 'Help article not found'
    })
})

app.get('*', (req, res) => {                                        //General - 404 Page
    res.render('404', {
        title: '404',
        name: 'Arie Charfnadel',
        notFoundText: 'Page not found'
    })
})

app.listen(3000, () => {                                            //Start-Up the server
    console.log('Server is up on port 3000.')
})