// https://api.darksky.net/forecast/a15ca078bcdf7a9683a14878875a55a5/33.9559799,-84.823106

const request = require('request');

var getWeather = (lat, long, callback) => {

request({
    url: `https://api.darksky.net/forecast/a15ca078bcdf7a9683a14878875a55a5/${lat},${long}`,
    json: true
}, (error, response, body) => {
    if (error){
        callback('Unable to connect to weather servers.');
    } else if (response.statusCode === 400 )
        callback(`Unable to fetch weather.`);
     else if ( response.statusCode === 200 )
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
})
};

module.exports = {
    getWeather
};