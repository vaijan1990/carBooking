const router = require('express').Router();


/*** Routes exports ***/
//you can simulate post,delete and patch requests with the "postman" software. https://www.getpostman.com/

module.exports = (rentalCar) => {

    /*This is the root middle layer which will be executed before any other routes.
     This route will be used to print the type of HTTP request the particular Route is referring to.
     Once the middle layer is defined, you must pass "next()" so that next router will get executed*/

    router.use(function (req,res,next) {
        console.log("/" + req.method);
        next();
    });

    // Find all the cars in the collection. this route will be localhost:3000/cars
    router.get('/', (request, response) => {

        rentalCar.find({},(err, cars) => {
            if(err)
                console.log(err);
            response.send(cars);
        })
    });

    // Find every car in the coll ection that is not booked at the moment. This route will be localhost:3000/cars/available
    router.post('/available', (request, response, next) => {
      const from = new Date(request.body.date['from']);
      const to  = new Date(request.body.date['to']);
      var fromDate = getFormatedDate(from);
      var toDate = getFormatedDate(to);
      if(from && to){
            rentalCar.find({},(err, cars) => {
                if(err)
                    console.log(err);
                const carBookedDate;
                for (var i=0; i<= (cars.length-1); i++){
                    carBookedDate = new Date(cars[i].startdate);

                  if(getFormatedDate(carBookedDate) == fromDate) {
                    console.log('inside loop');
                    console.log(i);
                      cars.splice(i,1);

                  }
                }
                console.log(fromDate);
                console.log(toDate);
                  response.render('ourcars', {carData: cars, bookingstartdate: fromDate, bookingenddate: toDate});
            });

      }else{
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
      }

    });
    function getFormatedDate(date) {

        var date = new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        if(dd < 10) { dd = '0' + dd; }
        if(mm < 10) { mm = '0' + mm; }

        return dd+'/'+mm+'/' + date.getFullYear();

    }
    //Find every car in the collection with the specified number of seats.
    // This route will be localhost:3000/cars/seats/enternumberofseats
    router.get('/seats/:seats', (request, response) => {

        var seats = request.params.seats;
        rentalCar.find({seats: seats},(err, cars) => {
            if(err)
                console.log(err);

            response.send(cars);
        })
    });

    // Cancel a booked car. This route will be localhost:3000/cars/cancel/theidofthecar
    router.patch('/cancel/:id', (request, response) => {

        var id = request.params.id;

        // Find the car by id and set it's booked value to false;
        rentalCar.findByIdAndUpdate(id, {booked: false},{new: true}, (err, cars) => {
            if(err)
                console.log(err);
            console.log(cars);
            response.send(cars);
        })
    });
    //add a new rental car to the database. This route will be localhost:3000/new
    router.post('/new', (request, response) => {

        var car = new rentalCar(request.body);
        car.save((err, result) => {
            if(err)
                console.log(err);
            response.send(result);
        })
    });

    // delete a car from the collection with the id. This route will be localhost:3000/cars/remove/idofthecar
    router.delete('/remove/:id', (request, response) => {
        var id = request.params.id;

        rentalCar.findByIdAndRemove(id, (err, result) => {
            if(err)
                console.log(err);
            console.log(result);
            response.send('you have deleted the following car: ' + '\n' +  result);
        })
    });

    return router;
};
