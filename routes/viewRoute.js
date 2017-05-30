const router = require('express').Router();


/*** Routes exports ***/

/*This is the root middle layer which will be executed before any other routes.
 This route will be used to print the type of HTTP request the particular Route is referring to.
 Once the middle layer is defined, you must pass "next()" so that next router will get executed*/

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

// Find all the cars in the collection. this route will be localhost:3000/cars
router.get('/', (request, response) => {
    response.render('index', {title: 'Hey'})
});

// the login form request is sent to this route
router.get('/login', (request, response) => {
    // check if the customer is in the database and the render appropriate view depending on the result.
    // render the index view again, but with the login button changed to logged in. or smth else..
    response.render('index')
});

// when a customer wants to become a member they're sent here
router.get('/register', (request, response) => {
    // render the register form to the client here
    response.send("render a register form here")
});




module.exports = router;
