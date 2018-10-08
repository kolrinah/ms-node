'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Load routes
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Config Headers

// Base routes
app.use('/api', user_routes);

module.exports = app;
