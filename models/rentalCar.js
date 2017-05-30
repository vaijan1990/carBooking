var mongoose = require('mongoose');

var rentalCarSchema = new mongoose.Schema({
    brand: String,
    auto: Boolean,
    priceperday: Number,
    seats: Number,
    towbar: Boolean,
    booked: Boolean
});

var rentalCar = mongoose.model('rentalCar', rentalCarSchema);

module.exports = rentalCar;
