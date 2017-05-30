const router = require('express').Router();


/*** Routes exports ***/
//you can simulate post,delete and patch requests with the "postman" software. https://www.getpostman.com/


module.exports = (customerDetail) => {

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

    // router.get('/', (request, response) => {
    //
    //     customerDetail.find({}, (err, customers) => {
    //         if (err)
    //             console.log(err);
    //         response.send(customers);
    //     })
    // });

    router.get('/profile', (request, response) => {
        response.send("the profile view")
    });

    router.get('/loginfail', (request, response) => {

        response.send('nåt gick fel');
    });

    router.get('/login', (request, response) => {
        response.send('this is the login screen');
    });

    //when click on register link
    router.get('/register', (request, response) => {
        response.render('registerForm', {loginText: "Login"});
    });

    //check login
    router.post('/registeruser', (request, response) =>{
        var name = request.body.name;
        var email = request.body.email;
        var username = request.body.username;
        var password = request.body.password;
        var password2 = request.body.password2;
        // response.redirect('profile');

        //Validation
        request.checkBody('name', 'Name is required').notEmpty();
        request.checkBody('email', 'Email is required').notEmpty();
        request.checkBody('email', 'Email is not mail').isEmail();
        request.checkBody('username', 'Username is required').notEmpty();
        request.checkBody('password', 'Password is required').notEmpty();
        request.checkBody('password2', 'Passwords do not match').equals(request.body.password);

        var errors = request.validationErrors();
        if(errors)
            response.redirect('register');
        else
            console.log("OK");

    });

    //Register a new member
    // router.post('/register', (req, res) => {
    //
    //     //insert the neccessary property fields in the new customer, phone, email etc later
    //     customerDetail.register(new customerDetail({
    //             name: req.body.name,
    //             phone: req.body.phone,
    //             username: req.body.email
    //         }),
    //         customerDetail.encryptPassword("test"), (error, user) => {
    //
    //             if (error) {
    //                 console.log('error while logging in: ', error);
    //                 res.render('register', {user: req.user});
    //             }
    //             passport.authenticate('local')(req, res, () => {
    //                 redirectUrl = req.user.set('/login');
    //                 console.log(redirectUrl);
    //                 res.redirect(redirectUrl); //on success, redirect with req.user set
    //             });
    //         });
    // });

    return router;
};
