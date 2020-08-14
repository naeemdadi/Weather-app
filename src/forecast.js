const request = require('request');

const forecast = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=0e1192934f379000b42c35e53e5b3cb4'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.weather[0].description + '. It is currently ' + body.main.temp + ' degrees out. The wind speed is ' + body.wind.speed + '. The humidity level is ' + body.main.humidity + '.');
        }
    })
}



module.exports = forecast;