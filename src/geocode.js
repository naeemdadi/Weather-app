const request = require('request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmFlZW1kYWRpIiwiYSI6ImNrZHB5eTZnZjI2cWEyem1yNWJ0NThpNXIifQ.sWxCtBvN_A0NQjgh1TnxHA&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
                place: body.query[0]
            })
        }
        
    })
}

module.exports = geoCode;