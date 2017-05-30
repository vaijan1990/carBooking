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
    response.render('index', {title: 'Hey', loginText: "Login"})
});

module.exports = router;
