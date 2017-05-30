const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const customerDetail = require('../models/customerDetail');

//Used to set the user to the cookie, save to session
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//Used to get the user from the cookie, get the session
passport.deserializeUser((id, done) => {

    customerDetail.findById(id, (err, user) => {
        console.log(user);
        done(err, user);
    })
});

passport.use('local.strategy', new LocalStrategy({
        usernameField: email,
        passwordField: password,
        passReqToCallback: true
    },
    (request, email, password, done) => {

        customerDetail.findOne({'email': email}, (err, user) => {
            if(err)
                return done(err);

            if(user)
                //the false part can be replaced with a flash message with connect-flash package
                return done(null, false);

            // if the user does not exist, create one
            let newCustomer = new customerDetail();

            //here we add data to the request.body thanks to bodyparser
            newCustomer.name = request.body.name;
            newCustomer.email = request.body.email;
            newCustomer.password = newCustomer.encryptPassword(request.body.password);

            newCustomer.save((err) => {
                if(err)
                    return done(err);

                return done(null, newCustomer);
            })
        })
    }
));