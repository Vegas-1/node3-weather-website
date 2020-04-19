const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))  //static root dir uses index.html

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ernesto Chavez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ernesto Chavez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Liar Liar, pants on fire, hanging on the telephone wire!',
    title: 'Help',
    name: 'Ernesto Chavez'
  })
})

app.get('/weather', (req, res) => {
address = req.query.address
if(!address) {
  return res.send( {
    error: 'You must provide an address for weather forecasting.'
  })
}

  geocode(address, (error, { longitude, latitude, location } = {} ) => {    //destructure the data object, setup default obj
    if (error) {
      return res.send({ error })
    }

    forecast(latitude,longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        lat: latitude,
        long: longitude,
        forecast: forecastData,
        location,
        address
      })
    }) 
  })
})

app.get('/products', (req, res) => {
if (!req.query.search) {
  return res.send({
    error: 'You must provide a search term'
  })
}

  console.log(req.query)
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res)=> {
  res.render('404Page', {
    errMsg: 'Help article not found',
    title: '404 Page',
    name: 'Ernesto Chavez'
  })
})

app.get('*', (req, res)=> {
  res.render('404Page', {
    errMsg: 'Page not found',
    title: '404 Page',
    name: 'Ernesto Chavez'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
}) 