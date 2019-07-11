'use strict';

const mongoose = require('mongoose');
const AdressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', AdressSchema);