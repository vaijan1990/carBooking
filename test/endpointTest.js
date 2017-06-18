/*** Assertion libraries ***/
const request = require('supertest');

/*** App import ***/
const app = require('../server');

// Test suite 1
describe('carRoutes', () => {

    it('GET/cars route should return http status code 200 and Content-Type application/json', (done) => {

        //Test case 1
        request(app)
            .get('/cars')
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200, done())
    });

    it('GET/cars/images route should return http status code 200 and Content-Type text/html', (done) => {

        //Test case 2
        request(app)
            .get('/cars/images')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done())
    });

    it('GET/aboutus route should return http status code 200 and Content-Type text/html', (done) => {

        //Test case 3
        request(app)
            .get('/aboutus')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done())
    });


    it('GET/loggedin route should return http status code 200 and Content-Type text/html', (done) => {

        //Test case 4
        request(app)
            .get('/loggedin')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done())
    });

    it("POST/cars/new route should add a new car ", (done) => {

        //Test case 5

        request(app)
            .post('/cars/new')
            .type('form')
            //send simulates a form request
            .send({brand: "Subaru", seats: 7, startdate: null, enddate: null, priceperday: 549})
            .expect((response) => {
                response.body.brand = 'Subaru';
                response.body.startdate = null;
                response.body.enddate = null;
                response.body.seats = '7';
                response.body.priceperday = 549;
            })
            .expect(200, {
                brand: "Subaru",
            startdate: null,
                enddate: null,
                seats: '7',
                priceperday: 549
            })
            .end((err, response) => {
                if (err)
                    return done(err);
                console.log(response.body);
                done();
            })
    });

    it('POST/available route should get available cars not booked on given startdate ', (done) => {
        //Test case 6
        request(app)
            .post('/cars/available')
            .type('form')
            .send({date_from: new Date('2017-06-28'), date_to: new Date('2017-06-30')})
            .expect((response) => {
                response.body.date_from = new Date('2017-06-28');
                response.body.date_to = new Date('2017-06-30');
            })
            .expect(200, {
                date_from: new Date('2017-06-28'),
                date_to: new Date('2017-06-30')
            })
            .end((err, response) => {
                if (err)
                    return done(err);
                console.log(response.body);
                done();
            })
    });


});
