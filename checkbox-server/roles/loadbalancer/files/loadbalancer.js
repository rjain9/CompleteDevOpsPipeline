var express = require('express');
var http_proxy = require('http-proxy');
var request = require('request');

var app = express();
var proxy   = http_proxy.createProxyServer({}});
var alert = false;

app.use(function(req, res, next)
{
	console.log(req.method, req.url);
	var port = 80;
	var server;

	if(Math.random() > 0.6 || alert === true){
		server = "192.168.33.6";
	}
	else{
		server = "192.168.33.3";        
	}
	console.log("Server: "+server+"  ############ Port: "+port);
	proxy.web( req, res, {target: 'http://'+server+":"+port } );
});

setInterval(function(){
	request('http://192.168.33.3:80/api/study',{timeout: 1500}, function(err,res,body){
		if(!res || res.statusCode != 200){
			console.log("canary server is down");
			alert = true;
		}
		else {
			console.log ("canary server is up");
			alert = false;
		}
	});
},2000);

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
});