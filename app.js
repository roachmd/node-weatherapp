const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyCFm56z76E25dXzs2z0Ha8fLGZWhwjEib4',
    json: true
}, (error, response,body) => {

    console.log(body);
});