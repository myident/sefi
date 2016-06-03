/* jslint node:true */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./app/config/express');

var app = express();

app.listen(5000);

console.log('API is running at http://localhost:5000/');

module.exports = app;