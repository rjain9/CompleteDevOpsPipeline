var express = require('express');
var http_proxy = require('http-proxy');
var request = require('request');
var file_system = require('fs');

var app = express();
var proxy   = http_proxy.createProxyServer({});
var iTrustIP = {};

/*app.use(function(req, res, next)
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
});*/

setInterval(function(){
	for (var i = 0; i < iTrustIP.length; i++) {
		request(`http://${iTrustIP[i]}:8080/iTrust2`,{timeout: 1500}, function(err,res,body){
			if(!res || res.statusCode != 200){
				console.log("iTrust server "+i+1+" is down");
			}
			else {
				console.log("iTrust server "+i+1+" is up");
			}
		});
	}
},2000);

var server = app.listen(4000, function () {
	var host = server.address().address;
	var port = server.address().port;

	ips = file_system.readFileSync('/home/ubuntu/templates/ec2_ip_list').toString().split(",");
	for (var i = 1; i < ips.length; i++) {
		iTrustIP[i-1] = ips[i].trim();
	}
});