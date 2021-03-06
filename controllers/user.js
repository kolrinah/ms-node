'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt  = require('../services/jwt');

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

function loginUser(req, res) {
    var params   = req.body;
    var email    = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) =>{
        if (err) {
            res.status(500).send({message: 'Error, bad request'});
        } else {
            if (!user) {
                res.status(404).send({message: 'User Does not exist'});
            } else {
                // Check Passwords
                bcrypt.compare(password, user.password, function(err, check) {
                    if (check) {
                      // get data from logged user
                      if (params.getHash) {
                          // return jwt token
                          res.status(200).send({
                            token: jwt.createToken(user)
                          });
                      } else {
                          res.status(200).send({user});
                      }
                    } else {
                        res.status(404).send({message: 'User or Password incorrect'})
                    }
                });
            }
        }
    }); 
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error updating user'});
        } else {
            if(!userUpdated) {
                res.status(404).send({message: 'User did not update'});
            } else {
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'Not uploaded...';

    if (req.files) {
        var file_path  = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\/');        
        var file_name  = file_split[2];        
        var ext_split  = file_name.split('\.');
        var file_ext   = ext_split[1].toLowerCase();
        console.log(file_ext);

        if (['png', 'jpg', 'gif', 'jpeg'].includes(file_ext)) {
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if(!userUpdated) {
                    res.status(404).send({message: 'User did not update'});
                } else {
                    res.status(200).send({user: userUpdated});
                }
            });

        } else {
            res.status(200).send({message: 'Invalid File'});    
        }
        console.log(file_path);
    } else {
        res.status(200).send({message: 'Image has not uploaded'});
    }
}

module.exports = {
    tests,
    saveUser,
    loginUser,
    updateUser,
    uploadImage
};