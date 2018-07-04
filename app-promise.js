const yargs = require('yargs');
const axios = require('axios');
const numeral = require('numeral');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
    .help()
    .alias('help','h')
    .argv;

var encodeaddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeaddress}&key=AIzaSyCFm56z76E25dXzs2z0Ha8fLGZWhwjEib4`;


axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;

    console.log(`Lat ${lat}`);
    console.log(`Long ${long}`);

    var weatherURL = `https://api.darksky.net/forecast/a15ca078bcdf7a9683a14878875a55a5/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var humidity = numeral(response.data.currently.humidity * 100).format('0.0');
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log (`Its's currently ${temperature} with a Relative humidity ${humidity}% So, it feels like ${apparentTemperature}`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API service');
    } else {
        console.log(e.message);
    }
});