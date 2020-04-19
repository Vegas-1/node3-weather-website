 const request = require('request')

const geocode = (address, cb) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ' .json?access_token=pk.eyJ1IjoiZWNoYXZlejEyMyIsImEiOiJjazU3cW43Y2UwZ3AwM2ttcndrNzFxbDRtIn0.Gizv9BcSKpuAY6MsPaprDg&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      cb('Unable to find location, try another search', undefined)
    } else {
      cb(undefined, {
        longitude: body.features[0].center[0],
        latitude:  body.features[0].center[1],
        location:  body.features[0].place_name
      })
    }
  })
}

module.exports = geocode