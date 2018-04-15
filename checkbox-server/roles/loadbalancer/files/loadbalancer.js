var express = require('express');
var http_proxy = require('http-proxy');
var request = require('request');
var file_system = require('fs');

var app = express();
var proxy   = http_proxy.createProxyServer({});
var alert = false;
var prod_ip = "";
var canary_ip = "";

app.use(function(req, res, next)
{
	console.log(req.method, req.url);
	var port = 80;
	var server;

	if(Math.random() > 0.4 || alert === true){
		server = prod_ip;
	}
	else{
		server = canary_ip;        
	}
	console.log("Server: "+server+"  ############ Port: "+port);
	proxy.web( req, res, {target: 'http://'+server+":"+port } );
});

setInterval(function(){
	request(`http://${canary_ip}:80/api/study/listing`,{timeout: 1500}, function(err,res,body){
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

	ips = file_system.readFileSync('/home/ubuntu/templates/ec2_ip_list').toString().split(",");
	prod_ip = ips[1].trim();
	canary_ip = ips[2].trim();
});