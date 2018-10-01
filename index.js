'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/cf_test', 
                 { useNewUrlParser: true }, 
                 (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('DataBase runnig');
        app.listen(port, function(){
            console.log("Server API listening on http://localhost:" + port);
        });
    }
});