// Core/NPM Modules
const fs = require("fs");
var testdb = require('../testdb.js');
testdb.exec;


/**
 * Generate test cases based on the global object functionConstraints.
 *
 * @param {String} filepath            Path to write test file.
 * @param {Object} functionConstraints Constraints object as returned by `constraints`.
 */

function generateTestCases2(filepath, functionConstraints) {
    let content =
        `let request = require('request');

var options = {
    url: '',
    method: '',
    headers: {
        "User-Agent": "EnableIssues",
        "content-type": "application/json"
    },
    json: {}
};\n
`;
    ids = testdb.ids;
    tokens = testdb.tokens;
    p1 = testdb.p1;
    p2 = testdb.p2;
    p3 = testdb.p3;
    p4 = testdb.p4;

    for (i in functionConstraints) {
        if (functionConstraints[i].method == 'GET' && functionConstraints[i].url.indexOf(':id') >= 0) {
            for (j in ids) {
                url = functionConstraints[i].url.substring(0, functionConstraints[i].url.indexOf(':id')) + ids[j];
                content = content + `options.method = 'GET';\n`;
                content = content + `options.url = '${url}';\n`;
                content = content + `request(options, function (error, response, body) {});\n\n`;
            }
        } else if (functionConstraints[i].method == 'GET' && functionConstraints[i].url.indexOf(':token') >= 0) {
            for (j in tokens) {
                url = functionConstraints[i].url.substring(0, functionConstraints[i].url.indexOf(':token')) + tokens[j];
                content = content + `options.method = 'GET';\n`;
                content = content + `options.url = '${url}';\n`;
                content = content + `request(options, function (error, response, body) {});\n\n`;
            }
        } else if (functionConstraints[i].method == 'GET') {
            url = functionConstraints[i].url;
            content = content + `options.method = 'GET';\n`;
            content = content + `options.url = '${url}';\n`;
            content = content + `request(options, function (error, response, body) {});\n\n`;
        } else if (functionConstraints[i].method == 'POST' && functionConstraints[i].url.indexOf('create') >= 0) {
            for (j in p1) {
                url = functionConstraints[i].url;
                content = content + `options.method = 'POST';\n`;
                content = content + `options.url = '${url}';\n`;
                content = content + `options.json = ${JSON.stringify(p1[j])}\n`;
                content = content + `request(options, function (error, response, body) {});\n\n`;
            }
        } else if (functionConstraints[i].method == 'POST' && functionConstraints[i].url.indexOf('submit') >= 0) {
            for (j in p2) {
                url = functionConstraints[i].url;
                content = content + `options.method = 'POST';\n`;
                content = content + `options.url = '${url}';\n`;
                content = content + `options.json = ${JSON.stringify(p2[j])}\n`;
                content = content + `request(options, function (error, response, body) {});\n\n`;
            }
        } else if (functionConstraints[i].method == 'POST' && functionConstraints[i].url.indexOf('open') >= 0) {
            url = functionConstraints[i].url;
            content = content + `options.method = 'POST';\n`;
            content = content + `options.url = '${url}';\n`;
            content = content + `options.json = ${JSON.stringify(p3)}\n`;
            content = content + `request(options, function (error, response, body) {});\n\n`;
        } else if (functionConstraints[i].method == 'POST' && functionConstraints[i].url.indexOf('close') >= 0) {
            url = functionConstraints[i].url;
            content = content + `options.method = 'POST';\n`;
            content = content + `options.url = '${url}';\n`;
            content = content + `options.json = ${JSON.stringify(p3)}\n`;
            content = content + `request(options, function (error, response, body) {});\n\n`;
        } else if (functionConstraints[i].method == 'POST' && functionConstraints[i].url.indexOf('notify') >= 0) {
            url = functionConstraints[i].url;
            content = content + `options.method = 'POST';\n`;
            content = content + `options.url = '${url}';\n`;
            content = content + `options.json = ${JSON.stringify(p4)}\n`;
            content = content + `request(options, function (error, response, body) {});\n\n`;
        }
    }
    fs.writeFileSync('test.js', content, "utf8");
}


// Export
module.exports = generateTestCases2;