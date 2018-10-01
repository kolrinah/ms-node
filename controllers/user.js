'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function tests(req, res) {
    res.status(200).send({
        message: 'Testing user action controller'
    });
}

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    user.name = params.name;
    user.lastName = params.lastName;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
       // crypt
       bcrypt.hash(params.password, null, null,
         function(err, hash) {
            user.password = hash;  
            if (user.name != null &&
                user.lastName != null &&
                user.email != null) {
                // Save User
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error saving user'});
                    } else {
                        if(!userStored) {
                            res.status(404).send({message: 'User already registered'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                })    
            } else {
                res.status(401).send({message: 'Fill the fields'});
            }
       });
    } else {
        res.status(401).send({message: 'Enter password'});
    }
}

module.exports = {
    tests,
    saveUser
};