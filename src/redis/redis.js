var redis = require('redis')
var express = require('express')
var app = express()

var client = redis.createClient(6379, '127.0.0.1', {})
client.auth("password");

app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.get('/featureFlagStatus', function (req, res) {
	{
		res.writeHead(200, { 'content-type': 'text/html' });
		client.exists("feature_flag", function (err, value) {
			res.write("<h2>Redis Feature Flag</h2>");
			if (value == 1) {
				res.write("<h3>Status: ON</h3>");
				res.end();
			}
			else {
				res.write("<h3>>Status: OFF</h3>");
				res.end();
			}
		});
	}
})

app.get('/featureFlagToggle', function (req, res) {
	{
		res.writeHead(200, { 'content-type': 'text/html' });
		client.exists("feature_flag", function (err, value) {
			res.write("<h2>Redis Feature Flag Toggled</h2>");
			if (value != 1) {
				client.set('feature_flag', 'on');
				res.write("<h3>Now set to ON</h3>");
				res.end();
			}
			else {
				client.del('feature_flag', function (err, reply) {
					res.write("<h3>Now set to OFF</h3>");
					res.end();
				});
			}
		});
	}
})


// HTTP SERVER
var server = app.listen(5000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})
