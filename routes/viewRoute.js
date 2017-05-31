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
    response.render('index', {title: 'Welcome'})
});

router.get('/loggedin', (request, response) => {
    response.render('index', {title: 'Welcome'})
});

router.get('/ourcars', (request, response) => {
    response.render('ourcars', {title: 'Our Vehicles'})
});

router.get('/aboutus', (request, response) => {
    response.render('aboutus', {title: 'About Us'})
});

// test post data
router.post('/test', (request, response) => {
  console.log(request.body.date.from);
  console.log(request.body.date.to);
});

module.exports = router;
