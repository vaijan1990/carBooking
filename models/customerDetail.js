const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');

var customerDetailSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    username: String,
    password: String,
    from: String,
    to: String
});

customerDetailSchema.plugin(passportLocalMongoose);

var customerDetail = module.exports = mongoose.model('customerDetail', customerDetailSchema);

module.exports.createUser = function (newCustomer, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
            newCustomer.password = hash;
            newCustomer.save(callback);
        })
    })
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username};
    customerDetail.findOne(query, callback)
};

module.exports.getUserById = function (id, callback) {
    customerDetail.findById(id, callback)
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
         if(err)
             throw err;
         callback(null, isMatch);
    })
};

