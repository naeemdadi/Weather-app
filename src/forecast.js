const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=0e1192934f379000b42c35e53e5b3cb4'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.weather[0].description + '. It is currently ' + body.main.temp + ' degrees out. The wind speed is ' + body.wind.speed);
        }
    })
}



module.exports = forecast;