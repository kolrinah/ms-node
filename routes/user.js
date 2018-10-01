'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/testing-controller', UserController.tests);
api.post('/user/register', UserController.saveUser);

module.exports = api;