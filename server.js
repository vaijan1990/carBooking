const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const url = "mongodb://janani:CarRentalService9!@ds137191.mlab.com:37191/carrentalservice";
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
  extended: false
}));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
