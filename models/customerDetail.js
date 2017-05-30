const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');

var customerDetailSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    password: String,
    email: String,
    from: String,
    to: String
});

customerDetailSchema.plugin(passportLocalMongoose);

customerDetailSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, 8);
};

module.exports =  mongoose.model('customerDetail', customerDetailSchema);
