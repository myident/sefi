/* jslint node:true */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./app/config/express');

var app = express();

var port = process.env.PORT || 5000;
app.listen(port);

console.log('API is running at http://localhost:5000/');

module.exports = app;