var express = require('express');
var bodyParser = require('body-parser');
var logger = require("morgan");

if (env !== 'production') {
    require('dotenv').config();
}

var router = require('./app/routes/html-routes.js');
var db = require("./app/models");

var app = express();
var env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.set('view engine', 'ejs');
app.use(logger("dev"));

// Start express app
app.listen(PORT, function(err){
        err ? console.log(err) : console.log("Express App Started";
});