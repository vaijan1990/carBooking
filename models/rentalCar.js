var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rentalCarSchema = new Schema({
    brand: String,
    auto: Boolean,
    pricPerDay: Number,
    towbar: Boolean,
    seats: String
});

var rentalCar = mongoose.model('rentalCar', rentalCarSchema);

module.exports = rentalCar;