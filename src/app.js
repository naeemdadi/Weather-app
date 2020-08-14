const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./forecast');
const geocode = require('./geocode');

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Naeem Dadi"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Naeem Dadi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        contact: 'Contact us',
        name: 'Naeem Dadi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geocode(req.query.address, (error, { place, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(place, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naeem Dadi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naeem Dadi',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})