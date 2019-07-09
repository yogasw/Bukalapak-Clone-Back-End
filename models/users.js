'use strict';

const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true
        },
        image_url: {
            type: String
        },
        phone: {
            type: String,
        },
        gender: {
            type: String
        },
        referral: {
            type: String
        },
        birth: {
            type: String
        },
        address: {
            type: String
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Users', UsersSchema);