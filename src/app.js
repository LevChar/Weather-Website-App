const path = require('path');                                       //Import path module
const express = require('express')                                  //Import express module
const hbs = require('hbs')                                          //Import hbs module
const geocode = require('./utils/geocode')                          //Import geocode module
const forecast = require('./utils/forecast')                        //Import forecast module

const app = express()                                               //Creates an Express application. 
const port = process.env.PORT || 3000                               //set the port, if used with Heroku will be asigned to PORT env variable
                                                                    //and if used locally will be 3000

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

app.get('/contact', (req, res) => {
    res.render('contact', {
        helpText: 'For technical assistance, general inquiries and suggestions for improvement, please contact by e-mail: fireballfxp@gmail.com',
        title: 'Stay in touch',
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
                return res.send({error})
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

app.listen(port, () => {                                            //Start-Up the server
    console.log('Server is up on port' + port + '.')
})