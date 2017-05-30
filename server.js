/*** Modules Imports ***/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

/*** Configuration ***/
app.set('view engine', 'pug');

/*** Models Imports ***/
var rentalCar = require('./models/rentalCar');
var customerDetail = require('./models/customerDetail');

/*** Routes import ***/
var carRoutes = require('./routes/carCollectionRoute')(rentalCar);
var customerRoutes = require('./routes/customerCollectionRoute')(customerDetail);
var viewRoutes = require('./routes/viewRoute');


/*** Miscellaneous ***/
const url = "mongodb://christianahlsen:carRentalService9!@ds137191.mlab.com:37191/carrentalservice";
const port = process.env.PORT || 3000;

/*** App "usages" ***/
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// set the public folder to be used when serving static js, css files to the client browser
app.use('/public', express.static(__dirname + '/public'));
app.set('views', './views');

//this is set so that every route in carCollectionRoute.js uses through localhost:3000/cars
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);


//route views/pages for main folder /
app.use('/', viewRoutes);

/*** Database connection with mongoose***/
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to database");
});

//hide warning message about promises
mongoose.Promise = global.Promise;

app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});

// this exports the routes to the endpointTest.js file
module.exports = app;
