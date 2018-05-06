/*
Filename: proxy.js
Author: Omkar Acharya
Description: This script contains a proxy server for checkbox.io and the code for 
Doctor Monkey and Reboot Monkey
*/

var redis = require('redis')
var express = require('express');
var http_proxy = require('http-proxy');
var request = require('request');
var file_system = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var app = express();
var proxy = http_proxy.createProxyServer({});
var cpuUsageThreshold = 10;

// Create a redis client
var client = redis.createClient(6379, "localhost", {})
// Authenticate the client
client.auth("password");

// Hit checkbox.io's /cpu route to get the CPU usage
function getCpuUsage(ip) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://' + ip + ':3003/cpu', false);
    xmlHttp.send(null);
    return parseInt(xmlHttp.responseText);
}

// Call the Doctor Monkey
app.use(function (req, res, next) {
    doctorMonkey(req, res);
})

// Doctor Monkey
function doctorMonkey(req, res) {
    // Check if any server exceeds the CPU threshold
    client.llen('reboot', function (err, result) {
        for (var i = 0; i < result; i++) {
            client.rpop('reboot', function (err, ip) {
                if (ip != null) {
                    var cpuUsage = getCpuUsage(ip);
                    if (cpuUsage <= cpuUsageThreshold) {
                        client.lpush('proxy', ip);
                    } else {
                        client.lpush('reboot', ip);
                    }
                }
            });
        }
    });

    // Exclude it from the forwarding servers
    client.rpop('proxy', function (err, ip) {
        cpuUsage = getCpuUsage(ip);
        if (cpuUsage <= cpuUsageThreshold) {
            forward = 'http://' + ip + ":3003";
            console.log('Forwarding to server: %s', forward);
            client.lpush('proxy', ip);
            proxy.web(req, res,
                {
                    target: forward
                });
        } else {
            if (ip != null) {
                console.log(ip + ' exceeds the CPU usage. Not forwarding to that any more..');
                client.lpush('reboot', ip);
                doctorMonkey(req, res);
            }
        }
    });
}

// Express Web Server as a proxy server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});