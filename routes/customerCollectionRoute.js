const router = require('express').Router();
const passport = require('../config/passportConfig');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


module.exports = (customerDetail) => {

    //DON'T erase the below code yet !
    //middleware function. checks if a user is logged in
    // const isLoggedIn = (req, res, next) => {
    //     if (req.isAuthenticated()) return next(); //go through
    //     res.redirect('/'); //if not, redirect to index
    // };

    router.use(function (req, res, next) {
        console.log("/" + req.method);
        // console.log(req.user);
        next();
    });

    router.get('/', (request, response) => {

        customerDetail.find({}, (err, customers) => {
            if (err)
                console.log(err);
            response.send(customers);
        })
    });

    router.get('/loginfail', (request, response) => {
        response.render("index");
    });

    router.get('/loggedout', (request, response) => {
        response.render('index');
    });

    //customer gets sent here when the registration is done
    router.get('/registered', (request, response) => {
        response.render('registrationdone');
    });

    //when click on register link
    router.get('/register', (request, response) => {
        response.render('registerForm');
    });

    //check login
    router.post('/registeruser', (request, response) => {
        var name = request.body.name;
        var email = request.body.email;
        var username = request.body.username;
        var phone = request.body.phone;
        var password = request.body.password;
        var password2 = request.body.password2;

        //Validation
        request.checkBody('name', 'Name is required').notEmpty();
        request.checkBody('email', 'Email is required').notEmpty();
        request.checkBody('email', 'Email is not mail').isEmail();
        request.checkBody('username', 'Username is required').notEmpty();
        request.checkBody('password', 'Password is required').notEmpty();
        request.checkBody('password2', 'Passwords do not match').equals(request.body.password);

        var errors = request.validationErrors();

        if (errors) {
            console.log(errors);
            response.render('registerForm', {errors: errors});
        }

        else {

            var newCustomer = new customerDetail({
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password
            });
            customerDetail.createUser(newCustomer, (err, user) => {
                if (err) throw err;
                console.log(user);
            });

            request.flash('success_msg', 'you registered successfully and can now log in ');
            response.redirect('registered');
        }
    });

    // login
    router.post('/login',
        passport.authenticate('local', {successRedirect: '/', failureRedirect: '/', failureFlash: true}),

        (request, response) => {
            response.redirect('/');
        }
    );

    router.get('/logout', (request, response) => {
        request.logout();
        request.flash('success_msg', 'you are logged out');
        response.redirect('/')
    });

    return router;
};
