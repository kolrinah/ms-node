'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/testing-controller', md_auth.ensureAuth, UserController.tests);
api.post('/user/register', UserController.saveUser);
api.post('/user/login', UserController.loginUser);
api.put('/user/update/:id',  md_auth.ensureAuth, UserController.updateUser);

module.exports = api;