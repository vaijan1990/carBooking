const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const customerDetail = require('../models/customerDetail');

passport.use(new LocalStrategy((username, password, done) => {

    customerDetail.getUserByUsername(username, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return done(null, false, {message: 'Unknown user'});

        customerDetail.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err
            }
            if (isMatch) {
                return done(null, user)
            }
            else {
                done(null, false, {message: 'Invalid password'})
            }
        })
    })

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    customerDetail.getUserById(id, (err, user) => {
        done(err, user);
    })
});

module.exports = passport;