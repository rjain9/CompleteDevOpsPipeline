var express = require('express');
var request = require('request');
var file_system = require('fs');

var app = express();
var iTrustIP = [];

setInterval(function () {
    request(`http://${iTrustIP[0]}:8080/iTrust2`, { timeout: 1500 }, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            console.log(`iTrust server ${iTrustIP[0]} is down`);
        }
        else {
            console.log(`iTrust server ${iTrustIP[0]} is up`);
        }
    });

    request(`http://${iTrustIP[1]}:8080/iTrust2`, { timeout: 1500 }, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            console.log(`iTrust server ${iTrustIP[1]} is down`);
        }
        else {
            console.log(`iTrust server ${iTrustIP[1]} is up`);
        }
    });

    request(`http://${iTrustIP[2]}:8080/iTrust2`, { timeout: 1500 }, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            console.log(`iTrust server ${iTrustIP[2]} is down`);
        }
        else {
            console.log(`iTrust server ${iTrustIP[2]} is up`);
        }
    });

    request(`http://${iTrustIP[3]}:8080/iTrust2`, { timeout: 1500 }, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            console.log(`iTrust server ${iTrustIP[3]} is down`);
        }
        else {
            console.log(`iTrust server ${iTrustIP[3]} is up`);
        }
    });

    request(`http://${iTrustIP[4]}:8080/iTrust2`, { timeout: 1500 }, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            console.log(`iTrust server ${iTrustIP[4]} is down`);
        }
        else {
            console.log(`iTrust server ${iTrustIP[4]} is up`);
        }
    });

    console.log("\n\n");

}, 2000);

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    ips = file_system.readFileSync('/home/ubuntu/templates/ec2_ip_list').toString().split(",");
    for (var i = 1; i < ips.length; i++) {
        iTrustIP[i - 1] = ips[i].trim();
    }
});