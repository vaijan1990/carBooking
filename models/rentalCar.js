var mongoose = require('mongoose');

var rentalCarSchema = new mongoose.Schema({
    brand: String,
    auto: Boolean,
    priceperday: Number,
    seats: Number,
    towbar: Boolean,
    booked: Boolean,
    startdate: {
      type: Date,
      required: true
    },
    enddate: {
      type: Date,
      required: true
    }

});

var rentalCar = mongoose.model('rentalCar', rentalCarSchema);

module.exports = rentalCar;
