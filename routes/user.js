'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty'); // TO Upload Files
var md_upload = multipart({ uploadDir: './uploads/users'});

api.get('/testing-controller', md_auth.ensureAuth, UserController.tests);
api.post('/user/register', UserController.saveUser);
api.post('/user/login', UserController.loginUser);
api.put('/user/update/:id',  md_auth.ensureAuth, UserController.updateUser);
api.post('/user/upload-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/user/google-api-testing', UserController.googleTest);
api.get('/user/to-googlesheet', UserController.UsersToGoogleSheet);

module.exports = api;