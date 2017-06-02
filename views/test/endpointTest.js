/*** Assertion libraries ***/
const request = require('supertest');

/*** App import ***/
const app = require('../server');

// Test suite 1
describe('carRoutes', () => {

    // Test case 1
    it('GET/cars route should return http status code 200 and Content-Type application/json', (done) => {

        //Test case 1
        request(app)
            .get('/cars')
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200, done)
    });

    it("POST/cars/new route should add a new car ",(done) => {

        request(app)
            .post('/cars/new')
            .type('form')
            //send simulates a form request
            .send({brand: "Subaru", auto: false, seats: 7, towbar: true, booked: true, priceperday: 549})
            .expect(200)
            .end((err, response) => {
            console.log(response.body);
            done(err)
            })
    })


});



