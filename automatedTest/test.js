var request = require('request');
request('http://192.168.33.100:3002/api/study/load/5aaf1bac14c02438f9d46318', function(err, res, body) {
    // let json = JSON.parse(body);
    if(err) console.log(err);
    console.log( body);
});