const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Muzaffer Hassan'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Muzaffer Hassan'
    });
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        message:'This is a sample help page message',
        name: 'Muzaffer Hassan'
    });
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide the address"
        })
    }
    
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData.forecast,
                address: req.query.address,
                icon: forecastData.icon
            })
        })
        
    })
    
})

app.get('/help/*', (req,res)=>{
    // res.send('Help article not found')
    res.render('404',{
        title:'404',
        name: 'Muzaffer Hassan',
        msg:'Help article not found.'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "Search term should be provided"
        })
    }
    res.send({
        products:[]
    })
})

app.get('*', (req, res)=>{
    // res.send('My 404 page')
    res.render('404',{
        title:'404',
        name: 'Muzaffer Hassan',
        msg:'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is successfully running on port '+port);
});