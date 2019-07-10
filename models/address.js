'use strict';

const mongoose = require('mongoose');
const AdressSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    receiver: {
        type: String,
        require: true
    },
    zipCode: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', AdressSchema);