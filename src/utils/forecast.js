const request = require('request')

const forecast = (latitude, longitude, cb) => {
  const url = 'https://api.darksky.net/forecast/2ab3e2b4bcd47d53b89708b610924165/' + latitude + ', ' + longitude
  
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        cb('Unable to find location!', undefined)
    } else {
      cb(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.  There is a ' + body.currently.precipProbability + ' % chance of rain.' + '  High Temp: ' 
      + body.daily.data[0].temperatureHigh + '  Low Temp: ' + body.daily.data[0].temperatureLow)
        // {
        // summary: response.body.daily.data[0].summary,
        // temperature: response.body.currently.temperature,
        // precipitaion: response.body.currently.precipProbability
    }
  })
} 

module.exports = forecast 