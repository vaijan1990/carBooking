/*** Modules Imports ***/
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dotEnvConfig = require('dotenv').config();
const path = require('path');
const express = require('express');
const MongoStore = require('connect-mongo')(session);

//Create app
const app = express();

/*** Configuration ***/
app.set('views', './views');
app.set('view engine', 'pug');

/*** Models Imports ***/
var rentalCar = require('./models/rentalCar');
var customerDetail = require('./models/customerDetail');

/*** Routes import ***/
var carRoutes = require('./routes/carCollectionRoute')(rentalCar);
var customerRoutes = require('./routes/customerCollectionRoute')(customerDetail);
var viewRoutes = require('./routes/viewRoute');


/*** App "usages" ***/

//Body parser
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,

    //don't erase this line yet :P
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection
    // })
}));


app.use(passport.initialize());
app.use(passport.session());

//Express-validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

//Connect-flash
app.use(flash());

//"Global" variabels.
app.use(function(request, response, next) {
    response.locals.success_msg =request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    response.locals.error = request.flash('error');
    response.locals.user = request.user || null;
    next();
});


//Set base url for the different routes
app.use(viewRoutes);
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);

// Static file paths
app.use(express.static(path.join(__dirname + '/public')));
app.use('/customers', express.static(path.join(__dirname + '/public')));
app.use('/cars', express.static(path.join(__dirname + '/public')));

/*** Miscellaneous ***/
const url = process.env.DB_HOST;
const port = process.env.PORT || 3000;

// passport.use(customerDetail.createStrategy());

/*** Database connection with mongoose***/
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database");
});

//hide warning message about promises
mongoose.Promise = global.Promise;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

// this exports the routes to the endpointTest.js file
module.exports = app;
