// Core/NPM Modules
const esprima = require("esprima");
const fs = require('fs');

const options = {
    tokens: true,
    tolerant: true,
    loc: true,
    range: true
};


let list = [];
function constraint2(filePath){
    let buf = fs.readFileSync(filePath, "utf8");
    let result = esprima.parse(buf, options);
    // Start traversing the root node
    traverse(result, function (node) {
        if (node.type === "CallExpression" && node.callee.property && (node.callee.property.name === "get" || node.callee.property.name === "post")) {
            a = {};
            a['method'] = node.callee.property.name.toString().toUpperCase();
            a['url'] = "http://localhost:80" + node.arguments[0].value.toString();
            list.push(a);
            // console.log(JSON.stringify(list));
        }
    });
    return list;
}

/**
 * Traverse an object tree, calling the visitor at each
 * visited node.
 *
 * @param {Object}   object  Esprima node object.
 * @param {Function} visitor Visitor called at each node.
 */
function traverse(object, visitor) {

    // Call the visitor on the object
    visitor(object);

    // Traverse all children of object
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

// Export
module.exports = constraint2;