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
        imageUrl: {
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
        },
        wishlist:{
            type:Array
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Users', UsersSchema);