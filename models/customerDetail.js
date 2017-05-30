var mongoose = require('mongoose');

var customerDetailSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    from: String,
    to: String
});

var customerDetail = mongoose.model('customerDetail', customerDetailSchema);

module.exports = customerDetail;
