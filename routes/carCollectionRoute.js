const router = require('express').Router();


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

/*** Routes exports ***/
//you can simulate post,delete and patch requests with the "postman" software. https://www.getpostman.com/

module.exports = (rentalCar) => {

    /*This is the root middle layer which will be executed before any other routes.
     This route will be used to print the type of HTTP request the particular Route is referring to.
     Once the middle layer is defined, you must pass "next()" so that next router will get executed*/

    router.use(function (req, res, next) {
        console.log("/" + req.method);
        next();
    });

    // Find all the cars in the collection. this route will be localhost:3000/cars
    router.get('/', (request, response) => {

        rentalCar.find({}, (err, cars) => {
            if (err)
                console.log(err);
            response.send(cars);
        })
    });

    // Find every car in the coll ection that is not booked at the moment. This route will be localhost:3000/cars/available
    router.post('/available', (request, response, next) => {

        if (request.body.startdate && request.body.enddate) {

            var today = new Date(Date.now());
            const requestedFromDate = new Date(request.body.date['from']);
            const requestedToDate = new Date(request.body.date['to']);
            console.log(requestedFromDate);

            var datesRange = [];
            var filteredCars;
            var endDateWithinRange = false;
            var startDateWithinRange = false;

            var carBookedStartDate;
            var carBookedEndDate;

            if (requestedFromDate < today.setHours(0, 0, 0, 0) || requestedToDate < today.setHours(0, 0, 0, 0)) {
                return response.render('ourcars', {wrongDate: "You can't set a lower date than todays date"})
            }
            if (requestedFromDate.getFullYear() > today.getFullYear() || requestedToDate.getFullYear() > today.getFullYear()) {
                return response.render('ourcars', {wrongDate: "you can only book a car within the current year"})
            }
            if (requestedToDate < requestedFromDate) {
                return response.render('ourcars', {wrongDate: "you can't set the \'to\' date to be lower than the \'from\' date"})
            }
            datesRange = getDates(requestedFromDate, requestedToDate);

            rentalCar.find({}, (err, cars) => {
                if (err)
                    console.log(err);

                filteredCars = cars.filter((car) => {
                    if (car.startdate) {

                        carBookedStartDate = new Date(car.startdate).toDateString();
                        carBookedEndDate = new Date(car.enddate).toDateString();

                        if (today.toDateString() === carBookedEndDate || carBookedEndDate === requestedFromDate.toDateString()) {
                            rentalCar.findByIdAndUpdate(car.id, {
                                startdate: null,
                                enddate: null
                            }, {new: true}, (err, updatedCar) => {
                                console.log(updatedCar);
                            })
                        }

                        for (var i = 0; i < datesRange.length - 1; i++) {

                            if (datesRange[i].toDateString() === carBookedEndDate) {

                                endDateWithinRange = true;
                                return car;
                            }

                            if( datesRange[i].toDateString() === carBookedStartDate){
                                startDateWithinRange = true;
                                return car;
                            }

                            if (datesRange[i].toDateString() === carBookedStartDate && datesRange[i].toDateString() !== carBookedEndDate) {
                                continue;
                            }
                        }
                    }
                    else {
                        console.log("these cars does not have a startdate value");
                        return car
                    }
                });
                var formattedStartDate = requestedFromDate.toDateString();
                var formattedEndDate = requestedToDate.toDateString();

                response.render('ourcars', {

                    carData: filteredCars,
                    startdate: formattedStartDate,
                    enddate: formattedEndDate,
                    endDateWithinRange: endDateWithinRange,
                    startDateWithinRange: startDateWithinRange
                });
            });
        }
        else{
            response.render('ourcars', {wrongDate: "you have to pick two dates"});
        }

    });

    //Find every car in the collection with the specified number of seats.
    // This route will be localhost:3000/cars/seats/enternumberofseats
    router.get('/seats/:seats', (request, response) => {

        var seats = request.params.seats;
        rentalCar.find({seats: seats}, (err, cars) => {
            if (err)
                console.log(err);

            response.send(cars);
        })
    });

    // Cancel a booked car. This route will be localhost:3000/cars/cancel/theidofthecar
    router.patch('/cancel/:id', (request, response) => {

        var id = request.params.id;

        // Find the car by id and set it's booked value to false;
        rentalCar.findByIdAndUpdate(id, {booked: false}, {new: true}, (err, cars) => {
            if (err)
                console.log(err);
            console.log(cars);
            response.send(cars);
        })
    });

    //add a new rental car to the database. This route will be localhost:3000/new
    router.post('/new', (request, response) => {

        var car = new rentalCar(request.body);
        car.save((err, result) => {
            if (err)
                console.log(err);
            response.send(result);
        })
    });

    // delete a car from the collection with the id. This route will be localhost:3000/cars/remove/idofthecar
    router.delete('/remove/:id', (request, response) => {
        var id = request.params.id;

        rentalCar.findByIdAndRemove(id, (err, result) => {
            if (err)
                console.log(err);
            console.log(result);
            response.send('you have deleted the following car: ' + '\n' + result);
        })
    });

    return router;
};
